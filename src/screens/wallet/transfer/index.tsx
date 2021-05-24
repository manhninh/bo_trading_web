import {yupResolver} from '@hookform/resolvers/yup';
import UsdtPng from 'assets/images/usdt.png';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {updateAmount} from 'routers/redux/slice';
import {formatter2} from 'utils/formatter';
import * as yup from 'yup';
import {Props, TYPE_WALLET} from './propState';
import {transferInternalMoney, transferMoney} from './services';
import './styled.css';

interface IState {
  show: boolean;
  type_transfer: 'IN_ACCOUNT' | 'TO_USERNAME' | null;
  amountFrom: number;
  amountTo: number;
}

interface IFormInAccount {
  amount: number;
  to: string;
}

interface IFormToUserName {
  amount: number;
  receiver_username: string;
  password: string;
  tfa?: string | undefined;
}

const TransferComponent = (props = Props) => {
  const {t} = useTranslation();
  const formDefaultInAccount: Readonly<IFormInAccount> = {
    amount: 0,
    to: props.type_wallet === TYPE_WALLET.SPOT ? 'trade' : 'spot',
  };
  const formDefaultToUsername: Readonly<IFormToUserName> = {
    receiver_username: '',
    amount: 0,
    password: '',
    tfa: '',
  };
  const [state, setState] = useState<IState>({
    show: false,
    type_transfer: 'IN_ACCOUNT',
    amountFrom: 0,
    amountTo: 0,
  });

  const {executeRecaptcha} = useGoogleReCaptcha();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const authState = useAppSelector((state) => state.authState);
  const isEnabledTFA = authState.accountInfor.isEnabledTFA;

  useEffect(() => {
    reset({...formDefaultToUsername, ...formDefaultInAccount});
  }, [state.type_transfer]);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .min(0, t('common:wallet.validAmountMin'))
      .max(
        props.amount,
        props.amount ? `${t('common:wallet.validAmountMax1')} ${props.amount}` : t('common:wallet.validAmountMax2'),
      )
      .typeError(t('common:wallet.validTypeError'))
      .required(t('common:wallet.validAmountEmpty')),
    to: yup.string().when('amount', {
      is: () => state.type_transfer === 'IN_ACCOUNT',
      then: yup.string().required(t('common:wallet.validTo')),
      otherwise: yup.string(),
    }),
    receiver_username: yup.string().when('amount', {
      is: () => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required(t('common:wallet.validReceiver')),
      otherwise: yup.string(),
    }),
    password: yup.string().when('receiver_username', {
      is: () => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required(t('common:wallet.validPassword')),
      otherwise: yup.string(),
    }),
    tfa: yup.string().when('password', {
      is: () => state.type_transfer === 'TO_USERNAME' && !!isEnabledTFA,
      then: yup.string().required(t('common:wallet.valid2fa')),
      otherwise: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<IFormInAccount | IFormToUserName>({
    defaultValues: useMemo(() => ({...formDefaultInAccount, ...formDefaultToUsername}), []),
    resolver: yupResolver(schema),
  });

  const onTransferSubmit = async (data: IFormInAccount & IFormToUserName) => {
    try {
      if (!executeRecaptcha) return;
      showLoading();
      const params: Partial<IFormInAccount & IFormToUserName> = {};
      switch (state.type_transfer) {
        case 'IN_ACCOUNT':
          params.amount = data.amount;
          params['to_wallet'] = data.to;
          params['from_wallet'] = props.type_wallet;
          break;
        case 'TO_USERNAME':
          params.amount = data.amount;
          params.password = data.password;
          params['username'] = data.receiver_username;
          if (isEnabledTFA) params.tfa = params.tfa;
          break;
      }

      const token = await executeRecaptcha('transfer');
      params['response'] = token;
      const functionAPI = state.type_transfer === 'TO_USERNAME' ? transferMoney : transferInternalMoney;
      const res = await functionAPI(params);
      if (res?.data) {
        setState({...state, show: false});
        reset({...formDefaultToUsername, ...formDefaultInAccount});

        // update lại số tiền vừa transfer
        if (state.type_transfer === 'IN_ACCOUNT') {
          const amountFrom = selectTypeWallet(props.type_wallet, data.amount, 'from');
          const amountTo = selectTypeWallet(data.to, data.amount, 'to');
          dispatch(updateAmount({...amountFrom, ...amountTo}));
        }
        let tabActive = 'TRANSFER';
        tabActive = tabActive
          .split('')
          .map((v) => (Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()))
          .join('');
        props.onRequestRefesh && props.onRequestRefesh(tabActive);
      }
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  const onSubmit = useCallback(onTransferSubmit, [executeRecaptcha, state]);

  const handleClose = () => setState((state) => ({...state, show: false, type_transfer: 'IN_ACCOUNT'}));

  const handleShow = () => {
    let amountFrom: number = 0;
    switch (props.type_wallet) {
      case TYPE_WALLET.SPOT:
        amountFrom = authState.accountInfor.amount;
        break;
      case TYPE_WALLET.TRADE:
        amountFrom = authState.accountInfor.amount_trade;
        break;
      case TYPE_WALLET.EXPERT:
        amountFrom = authState.accountInfor.amount_expert;
        break;
      case TYPE_WALLET.COPY_TRADE:
        amountFrom = authState.accountInfor.amount_copytrade;
        break;
    }
    const to = props.type_wallet === TYPE_WALLET.SPOT ? 'trade' : 'spot';
    let amountTo: number = 0;
    if (to === 'spot') amountTo = authState.accountInfor.amount;
    else if (to === 'trade') amountTo = authState.accountInfor.amount_trade;
    setState((state) => ({...state, show: true, amountFrom, amountTo}));
  };

  const selectTransfer = (type) => {
    if (state.type_transfer === type) return;
    if (!state.type_transfer || state.type_transfer !== type) {
      setState({...state, type_transfer: type});
    }
  };

  // const amountFrom = useMemo(() => {
  //   let number = getValues().amount;
  //   if (`${getValues().amount}`.charAt(0) == '0') {
  //     number = parseInt(`${getValues().amount}`, 10);
  //     setValue('amount', number);
  //   }
  //   const amount = props.amount - Number(number);
  //   if (amount < 0 || amount > props.amount) {
  //     const maxAmount = Math.max(Number(0), Math.min(Number(props.amount), Number(number)));
  //     setValue('amount', Math.floor(maxAmount * 100) / 100);
  //     return formatter2.format(maxAmount);
  //   } else return formatter2.format(amount);
  // }, watch(['amount']));

  // const addAmountTo = useMemo(() => {
  //   let amountByTypeWallet: number = 0;
  //   if (evt.target.value === 'spot') amountByTypeWallet = authState.accountInfor.amount;
  //   if (evt.target.value === 'trade') amountByTypeWallet = authState.accountInfor.amount_trade;
  //   if (evt.target.value === 'expert') amountByTypeWallet = authState.accountInfor.amount_expert;
  //   if (evt.target.value === 'copytrade') amountByTypeWallet = authState.accountInfor.amount_copytrade;

  //   // Cộng trực tiếp số tiền cho To Wallet
  //   // Add thêm watch 'amount'
  //   // const amount = props.amount ? amountByTypeWallet + Number(getValues().amount) : amountByTypeWallet;
  //   // return formatter2.format(amount);

  //   return formatter2.format(amountByTypeWallet);
  // }, watch(['to']));

  const _onChange = (evt: any) => {
    let amountTo = 0;
    if (evt.target.value === 'spot') amountTo = authState.accountInfor.amount;
    else if (evt.target.value === 'trade') amountTo = authState.accountInfor.amount_trade;
    else if (evt.target.value === 'expert') amountTo = authState.accountInfor.amount_expert;
    else if (evt.target.value === 'copytrade') amountTo = authState.accountInfor.amount_copytrade;
    setState((state) => ({...state, amountTo}));
  };

  const selectTypeWallet = (type_wallet, amount, fromTo: 'from' | 'to') => {
    let amountWallet = {};
    const amountFrom = props.amount - amount;
    switch (type_wallet) {
      case TYPE_WALLET.SPOT:
        amountWallet['amount'] = fromTo === 'from' ? amountFrom : authState.accountInfor.amount + Number(amount);
        break;
      case TYPE_WALLET.TRADE:
        amountWallet['amount_trade'] =
          fromTo === 'from' ? amountFrom : authState.accountInfor.amount_trade + Number(amount);
        break;
      case TYPE_WALLET.EXPERT:
        amountWallet['amount_expert'] =
          fromTo === 'from' ? amountFrom : authState.accountInfor.amount_expert + Number(amount);
        break;
      case TYPE_WALLET.COPY_TRADE:
        amountWallet['amount_copytrade'] =
          fromTo === 'from' ? amountFrom : authState.accountInfor.amount_copytrade + Number(amount);
        break;
    }
    return amountWallet;
  };

  return (
    <>
      <button type="button" className="btn btn-sm btn-warning" onClick={handleShow}>
        {t('common:wallet.tranfer')}
      </button>
      <Modal show={state.show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-500w">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">{t('common:wallet.tranferModal1')}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {!props.onlyInAccount ? (
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="i-checks">
                    <input
                      type="radio"
                      checked={state.type_transfer === 'IN_ACCOUNT'}
                      value="IN_ACCOUNT"
                      className="radio-template"
                      onChange={(event) => selectTransfer(event.target.value)}
                    />
                    <label>{t('common:wallet.inAccount')}</label>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="i-checks">
                    <input
                      type="radio"
                      checked={state.type_transfer === 'TO_USERNAME'}
                      value="TO_USERNAME"
                      className="radio-template"
                      onChange={(event) => selectTransfer(event.target.value)}
                    />
                    <label>{t('common:wallet.toUsername')}</label>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    {t('common:wallet.amount')} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control mb-1 form-control-sm"
                    {...register('amount')}
                    min={0}
                    max={props.amount}
                  />
                  <p className="text-right mb-0">
                    {t('common:wallet.balance')}: {formatter2.format(state.amountFrom)} USDF
                  </p>
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.amount?.message}
                  </div>
                </div>
              </div>
              {state.type_transfer === 'IN_ACCOUNT' ? (
                <div className="col-md-6 col-xs-12">
                  <Form.Group className="mb-1">
                    <Form.Label>{t('common:wallet.to')}</Form.Label>
                    <Form.Control as="select" size="sm" {...register('to')} onChange={_onChange}>
                      {props.type_wallet !== TYPE_WALLET.SPOT && (
                        <option value={'spot'}>{t('common:wallet.walletSpot')}</option>
                      )}
                      {props.type_wallet !== TYPE_WALLET.TRADE && (
                        <option value={'trade'}>{t('common:wallet.walletTrade')}</option>
                      )}
                      {/* {props.type_wallet !== TYPE_WALLET.EXPERT && (
                        <option value={'expert'}>{t('common:wallet.walletExpert')}</option>
                      )}
                      {props.type_wallet !== TYPE_WALLET.COPY_TRADE && (
                        <option value={'copytrade'}>{t('common:wallet.walletCopy')}</option>
                      )} */}
                    </Form.Control>
                  </Form.Group>
                  <p className="text-right mb-0">
                    {t('common:wallet.balance')}: {formatter2.format(state.amountTo)} USDF
                  </p>
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors['to']?.message}
                  </div>
                </div>
              ) : null}
              {state.type_transfer === 'TO_USERNAME' ? (
                <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <label className="form-control-label">{t('common:wallet.receiverUsername')}</label>
                    <span className="text-danger">*</span>
                    <input type="text" className="form-control form-control-sm" {...register('receiver_username')} />
                    <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                      {errors['receiver_username']?.message}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {state.type_transfer === 'TO_USERNAME' ? (
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <label className="form-control-label">
                      {t('common:wallet.password')} <span className="text-danger">*</span>
                    </label>
                    <input type="password" className="form-control form-control-sm" {...register('password')} />
                    <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                      {errors['password']?.message}
                    </div>
                  </div>
                </div>
                {!!isEnabledTFA && (
                  <div className="col-md-6 col-xs-12">
                    <div className="form-group">
                      <label className="form-control-label">{t('common:wallet.2fa')}</label>
                      <input type="text" className="form-control form-control-sm" maxLength={6} {...register('tfa')} />
                      <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                        {errors['tfa']?.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            <button type="button" className="btn btn-block btn-warning" onClick={handleSubmit(onSubmit)}>
              {t('common:wallet.tranfer')}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(TransferComponent);

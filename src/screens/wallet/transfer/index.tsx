import {yupResolver} from '@hookform/resolvers/yup';
import UsdtPng from 'assets/images/usdt.png';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {formatter2} from 'utils/formatter';
import * as yup from 'yup';
import {Props, TYPE_WALLET} from './propState';
import {transferInternalMoney, transferMoney} from './services';
import './styled.css';

interface IState {
  show: boolean;
  type_transfer: 'IN_ACCOUNT' | 'TO_USERNAME' | null;
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
  const formDefaultInAccount: Readonly<IFormInAccount> = {
    amount: 0,
    to: '',
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
      .min(0, 'Amount must be greater than 0')
      .max(
        props.amount,
        props.amount
          ? `Amount cannot greater than ${props.amount}`
          : `The available balance is not sufficient to the transfer`,
      )
      .typeError('Must be a number')
      .required('Amount cannot be empty'),
    to: yup.string().when('amount', {
      is: () => state.type_transfer === 'IN_ACCOUNT',
      then: yup.string().required('To cannot be empty!'),
      otherwise: yup.string(),
    }),
    receiver_username: yup.string().when('amount', {
      is: () => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required('Receiver username cannot be empty!'),
      otherwise: yup.string(),
    }),
    password: yup.string().when('receiver_username', {
      is: () => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required('Password cannot be empty'),
      otherwise: yup.string(),
    }),
    tfa: yup.string().when('password', {
      is: () => state.type_transfer === 'TO_USERNAME' && !!isEnabledTFA,
      then: yup.string().required('Two-Factor Authentication cannot be empty!'),
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
        // if (state.type_transfer === 'IN_ACCOUNT') {
        //   const amountFrom = selectTypeWallet(props.type_wallet, data.amount, 'from');
        //   const amountTo = selectTypeWallet(data.to, data.amount, 'to');
        //   dispatch(updateAmount({...amountFrom, ...amountTo}));
        // }
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
  const handleShow = () => setState((state) => ({...state, show: true}));

  const selectTransfer = (type) => {
    if (state.type_transfer === type) return;
    if (!state.type_transfer || state.type_transfer !== type) {
      setState({...state, type_transfer: type});
    }
  };

  const subtractAmountFrom = useMemo(() => {
    const amount = props.amount - Number(getValues().amount);
    if (amount < 0 || amount > props.amount) {
      const maxAmount = Math.max(Number(0), Math.min(Number(props.amount), Number(getValues().amount)));
      setValue('amount', Math.floor(maxAmount * 100) / 100);
      return formatter2.format(maxAmount);
    } else return formatter2.format(amount);
  }, watch(['amount']));

  const addAmountTo = useMemo(() => {
    let amountByTypeWallet: number = 0;
    if (getValues()['to'] === 'spot') amountByTypeWallet = authState.accountInfor.amount;
    if (getValues()['to'] === 'trade') amountByTypeWallet = authState.accountInfor.amount_trade;
    if (getValues()['to'] === 'expert') amountByTypeWallet = authState.accountInfor.amount_expert;
    if (getValues()['to'] === 'copytrade') amountByTypeWallet = authState.accountInfor.amount_copytrade;

    // Cộng trực tiếp số tiền cho To Wallet
    // Add thêm watch 'amount'
    // const amount = props.amount ? amountByTypeWallet + Number(getValues().amount) : amountByTypeWallet;
    // return formatter2.format(amount);

    return formatter2.format(amountByTypeWallet);
  }, watch(['to']));

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
        Transfer
      </button>
      <Modal show={state.show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-500w">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">Transfer Money</h2>
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
                    <label>In Account</label>
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
                    <label>To Username</label>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control mb-1 form-control-sm"
                    {...register('amount')}
                    min={0}
                    max={props.amount}
                  />
                  <p className="text-right">Balance: {subtractAmountFrom} USDF</p>
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.amount?.message}
                  </div>
                </div>
              </div>
              {state.type_transfer === 'IN_ACCOUNT' ? (
                <div className="col-md-6 col-xs-12">
                  <Form.Group className="mb-1">
                    <Form.Label>To</Form.Label>
                    <Form.Control as="select" size="sm" {...register('to')}>
                      {props.type_wallet !== TYPE_WALLET.SPOT && <option value={'spot'}>Wallet Spot</option>}
                      {props.type_wallet !== TYPE_WALLET.TRADE && <option value={'trade'}>Wallet Trade</option>}
                      {props.type_wallet !== TYPE_WALLET.EXPERT && <option value={'expert'}>Wallet Expert</option>}
                      {props.type_wallet !== TYPE_WALLET.COPY_TRADE && (
                        <option value={'copytrade'}>Wallet Copy Trade</option>
                      )}
                    </Form.Control>
                  </Form.Group>
                  <p className="text-right">Balance: {addAmountTo} USDF</p>
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors['to']?.message}
                  </div>
                </div>
              ) : null}
              {state.type_transfer === 'TO_USERNAME' ? (
                <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <label className="form-control-label">Receiver Username</label>
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
                      Password <span className="text-danger">*</span>
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
                      <label className="form-control-label">Two-factor authentication</label>
                      <input type="text" className="form-control form-control-sm" maxLength={6} {...register('tfa')} />
                      <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                        {errors['tfa']?.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
            <input
              type="button"
              value="TRANSFER"
              className="btn btn-block btn-warning"
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(TransferComponent);

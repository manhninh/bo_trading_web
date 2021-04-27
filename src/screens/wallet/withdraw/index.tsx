import {yupResolver} from '@hookform/resolvers/yup';
import UsdtPng from 'assets/images/usdt.png';
import WithdrawWalletPng from 'assets/images/withdraw_wallet.png';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useMemo, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {IProps, Props} from './propState';
import {createWithdraw} from './services';
import './styled.css';

interface IFormWithdraw {
  symbol: 'trc20' | 'erc20';
  amount: number;
  password: string;
  address: string;
  tfa: string | undefined;
}

const WithdrawComponent = (props: IProps = Props) => {
  const formDefault: Readonly<IFormWithdraw> = {
    symbol: 'trc20',
    address: '',
    amount: 0,
    password: '',
    tfa: '',
  };
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [state, setState] = useState({
    show: false,
    symbol: 'trc20',
  });
  const authState = useAppSelector((state) => state.authState);
  const isEnabledTFA = authState.accountInfor.isEnabledTFA;

  const schema = yup.object().shape({
    symbol: yup.string().required('Symbol is required'),
    amount: yup
      .number()
      .typeError('Must be a number')
      .min(20, 'Amount must not be less than 20')
      .required('Amount cannot be empty'),
    address: yup.string().required('Address cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
    tfa: yup.string().when('password', {
      is: (_) => !!isEnabledTFA,
      then: yup.string().required('Two-Factor Authentication cannot be empty!'),
      otherwise: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm<IFormWithdraw>({
    defaultValues: useMemo(() => formDefault, []),
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormWithdraw) => {
    try {
      showLoading();
      const res = await createWithdraw(data);
      if (res.data) {
        reset(formDefault);
        setState({...state, show: false});
        props.onRequestRefesh('WITHDRAW');
      }
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  const _selectCurrency = (currency: 'trc20' | 'erc20') => () => {
    setState({...state, symbol: currency});
    setValue('symbol', currency);
  };

  const handleClose = () => setState((state) => ({...state, show: false}));
  const handleShow = () => setState((state) => ({...state, show: true}));

  return (
    <>
      <button type="button" className="btn btn-sm btn-success" onClick={handleShow}>
        Withdraw
      </button>
      <Modal show={state.show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-500w">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">Withdraw Money</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row mb-2">
            <div className="col-6">
              <Button
                className={`${state.symbol === 'erc20' ? 'btn-info' : 'btn-outline-secondary'} btn-sm mr-3`}
                onClick={_selectCurrency('erc20')}>
                ERC20
              </Button>
              <Button
                className={`${state.symbol === 'trc20' ? 'btn-info' : 'btn-outline-secondary'} btn-sm`}
                onClick={_selectCurrency('trc20')}>
                TRC20
              </Button>
            </div>
            <div className="col-6 d-flex justify-content-end mt-1">
              <span className="text-primary text-bold mb-0">Balance: {20} USDT</span>
            </div>
          </div>
          <form className="form-validate">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label className="form-control-label">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    autoFocus={true}
                    {...register('amount')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.amount?.message}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <p className="mb-2 text-right">Withdraw fees: 20 USDT</p>
                <p className="mb-2 text-right">Net Amount: 0 USDT</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Address USDT - ERC20 <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control form-control-sm" {...register('address')} />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.address?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input type="password" className="form-control form-control-sm" {...register('password')} />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.password?.message}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">Two-factor authentication</label>
                  <input type="text" className="form-control form-control-sm" maxLength={6} {...register('tfa')} />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.tfa?.message}
                  </div>
                </div>
              </div>
            </div>
            <input
              type="button"
              value="WITHDRAW"
              className="btn btn-block btn-success"
              onClick={handleSubmit(onSubmit)}
            />
          </form>
          <div className="text-center mt-4">
            <img src={WithdrawWalletPng} alt="..." className="img-fluid w-150" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(WithdrawComponent);

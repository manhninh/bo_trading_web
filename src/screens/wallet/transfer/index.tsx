import { yupResolver } from '@hookform/resolvers/yup';
import UsdtPng from 'assets/images/usdt.png';
import WithdrawWalletPng from 'assets/images/withdraw_wallet.png';
import { useAppSelector } from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import { useLoading } from 'containers/hooks/loadingProvider/userLoading';
import React, { useEffect, useMemo, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { IProps, Props } from './propState';
import { transferMoney } from './services';
import './styled.css';

interface IState {
  show: boolean;
  type_transfer: 'IN_ACCOUNT' | 'TO_USERNAME' | null;
}

interface IFormInAccount {
  amount: number;
  from: string;
  to: string;
}

interface IFormToUserName {
  amount: number;
  receiver_username: string;
  password: string;
  tfa?: string | undefined;
}

const TransferComponent = (props: IProps = Props) => {
  const formDefaultInAccount: Readonly<IFormInAccount> = {
    amount: 0,
    from: '',
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
    type_transfer: null
  });

  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();
  const { addError } = useError();
  const authState = useAppSelector((state) => state.authState);
  const isEnabledTFA = authState.accountInfor.isEnabledTFA;

  useEffect(() => {
    reset({ ...formDefaultToUsername, ...formDefaultInAccount });
  }, [state.type_transfer]);

  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError('Must be a number')
      // .min(20, 'Amount must not be less than 20')
      .required('Amount cannot be empty'),
    from: yup.string().when('amount', {
      is: (_) => state.type_transfer === 'IN_ACCOUNT',
      then: yup.string().required('From cannot be empty!'),
      otherwise: yup.string(),
    }),
    to: yup.string().when('amount', {
      is: (_) => state.type_transfer === 'IN_ACCOUNT',
      then: yup.string().required('To cannot be empty!'),
      otherwise: yup.string(),
    }),
    receiver_username: yup.string().when('amount', {
      is: (_) => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required('Receiver username cannot be empty!'),
      otherwise: yup.string(),
    }),
    password: yup.string().when('receiver_username', {
      is: (_) => state.type_transfer === 'TO_USERNAME',
      then: yup.string().required('Password cannot be empty'),
      otherwise: yup.string(),
    }),
    tfa: yup.string().when('password', {
      is: (_) => state.type_transfer === 'TO_USERNAME' && !!isEnabledTFA,
      then: yup.string().required('Two-Factor Authentication cannot be empty!'),
      otherwise: yup.string(),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInAccount | IFormToUserName>({
    defaultValues: useMemo(() => ({ ...formDefaultInAccount, ...formDefaultToUsername }), []),
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInAccount | IFormToUserName) => {
    try {
      showLoading();
      const params = {};
      switch (state.type_transfer) {
        case 'IN_ACCOUNT':
          params['amount'] = data.amount;
          params['from'] = data['from'];
          params['to'] = data['to'];
          break;
        case 'TO_USERNAME':
          params['amount'] = data.amount;
          params['username'] = data['receiver_username'];
          params['password'] = data['password'];
          if (isEnabledTFA) params['tfa'] = data['tfa'];
          break;
      }
      const res = await transferMoney(params);
      if (res?.data) {
        setState({ ...state, show: false, type_transfer: null });
        props.onRequestRefesh("TRANSFER");
      }
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  const handleClose = () => setState((state) => ({ ...state, show: false, type_transfer: null }));
  const handleShow = () => setState((state) => ({ ...state, show: true }));

  const selectTransfer = (type) => {
    if (state.type_transfer === type) return;
    if (!state.type_transfer || state.type_transfer !== type) {
      setState({ ...state, type_transfer: type });
    }
  };

  return (
    <>
      <button type="button" className="btn btn-sm btn-warning mx-2" onClick={handleShow}>
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
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input type="number" className="form-control form-control-sm" {...register("amount")} />
                  <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                    {errors.amount?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-2" style={{ border: '1px solid #3d4148' }} />
            <div className="i-checks">
              <input type="radio" checked={state.type_transfer === 'IN_ACCOUNT'} value="IN_ACCOUNT" className="radio-template" onChange={(event) => selectTransfer(event.target.value)} />
              <label>In Account</label>
            </div>
            {state.type_transfer === 'IN_ACCOUNT' && <div className="row">
              <div className="col-md-6 col-xs-12">
                <Form.Group className="mb-1">
                  <Form.Label>From</Form.Label>
                  <Form.Control as="select" size="sm" {...register("from")}>
                    <option value={"spot"}>Wallet Spot</option>
                    <option value={"trade"}>Wallet Trade</option>
                    <option value={"expert"}>Wallet Expert</option>
                    <option value={"copy_trade"}>Wallet Copy Trade</option>
                  </Form.Control>
                </Form.Group>
                <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                  {errors['from']?.message}
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <Form.Group className="mb-1">
                  <Form.Label>To</Form.Label>
                  <Form.Control as="select" size="sm" {...register("to")}>
                    <option value={"spot"}>Wallet Spot</option>
                    <option value={"trade"}>Wallet Trade</option>
                    <option value={"expert"}>Wallet Expert</option>
                    <option value={"copy_trade"}>Wallet Copy Trade</option>
                  </Form.Control>
                </Form.Group>
                <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                  {errors['to']?.message}
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <p className="text-right">Balance: 20 USDT</p>
              </div>
              <div className="col-md-6 col-xs-12">
                <p className="text-right">Balance: 20 USDT</p>
              </div>
              <input type="button" value="TRANSFER" className="btn btn-block btn-warning" onClick={handleSubmit(onSubmit)} />
            </div>}
            <div className="mb-2" style={{ border: '1px solid #3d4148' }} />
            <div className="i-checks">
              <input type="radio" checked={state.type_transfer === 'TO_USERNAME'} value="TO_USERNAME" className="radio-template" onChange={(event) => selectTransfer(event.target.value)} />
              <label>To Username</label>
            </div>
            {state.type_transfer === 'TO_USERNAME' && <div className="form">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <label className="form-control-label">Receiver Username</label> <span className="text-danger">*</span>
                    <input type="text" className="form-control form-control-sm" {...register("receiver_username")} />
                    <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                      {(errors['receiver_username'])?.message}
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
                    <input type="password" className="form-control form-control-sm" {...register("password")} />
                    <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                      {(errors['password'])?.message}
                    </div>
                  </div>
                </div>
                {!!isEnabledTFA && <div className="col-md-6 col-xs-12">
                  <div className="form-group">
                    <label className="form-control-label">Two-factor authentication</label>
                    <input type="text" className="form-control form-control-sm" maxLength={6} {...register("tfa")} />
                    <div className="is-invalid invalid-feedback" style={{ display: 'block' }}>
                      {(errors['tfa'])?.message}
                    </div>
                  </div>
                </div>}
              </div>
              <input type="button" value="TRANSFER" className="btn btn-block btn-warning" onClick={handleSubmit(onSubmit)} />
            </div>}
          </form>
          <div className="text-center mt-4">
            <img src={WithdrawWalletPng} alt="..." className="img-fluid w-150" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(TransferComponent);

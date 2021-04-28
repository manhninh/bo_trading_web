import UsdtPng from 'assets/images/usdt.png';
import QRCode from 'qrcode.react';
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {getWalletAddress} from './services';
import './styled.css';

const DepositComponent = () => {
  const [state, setState] = useState({
    show: false,
    trc20: null,
    erc20: null,
    copied: false,
    type: 'trc20',
  });

  useEffect(() => {
    (async () => {
      const res = await getWalletAddress();
      if (res.data) {
        setState({...state, trc20: res.data.trc20, erc20: res.data.erc20});
      }
    })();
  }, []);
  const handleClose = () => setState((state) => ({...state, show: false}));
  const handleShow = () => setState((state) => ({...state, show: true}));

  const _copy = () => {
    if (state.copied) return;

    setState({...state, copied: true});
    navigator.clipboard.writeText(state[state.type]);

    setTimeout(() => {
      setState({...state, copied: false});
    }, 2000);
  };

  const _selectCurrency = (currency: 'trc20' | 'erc20') => () => {
    setState({...state, type: currency});
  };

  return (
    <>
      <button type="button" className="btn btn-sm btn-info mr-2" onClick={handleShow}>
        Deposit
      </button>
      <Modal show={state.show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-deposit">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">Deposit Money</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <Button
              onClick={_selectCurrency('erc20')}
              className={`${state.type === 'erc20' ? 'btn-info' : 'btn-outline-secondary'} btn-sm mr-3`}>
              ERC20
            </Button>
            <Button
              onClick={_selectCurrency('trc20')}
              className={`${state.type === 'trc20' ? 'btn-info' : 'btn-outline-secondary'} btn-sm`}>
              TRC20
            </Button>
          </div>
          <p className="text-center mb-0">
            This is wallet's deposit address, which accepts only USDT.{state.type === 'trc20' ? 'TRC20' : 'ERC20'}.
          </p>
          <p className="text-center">Please do not deposit other cryptocurrency</p>
          <div className="text-center mb-3">
            <QRCode value={state[state.type] || ''} renderAs="svg" includeMargin={true} level="H" size={200} />
          </div>
          <div className="form-group mb-2">
            <div className="input-group">
              <input
                type="text"
                value={state[state.type] || ''}
                className="form-control form-control-sm"
                disabled={true}
                readOnly={true}
              />
              <div className="input-group-append">
                <button disabled={!state[state.type]} type="button" className="btn btn-sm btn-primary" onClick={_copy}>
                  {state.copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <h6 className="text-center text-danger">
            Note: The minimum deposit amount is 30 USDT, less than this amount will not be credited to your balance
            wallet
          </h6>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(DepositComponent);

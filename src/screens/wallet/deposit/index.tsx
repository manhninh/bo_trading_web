import UsdtPng from 'assets/images/usdt.png';
import QRCode from 'qrcode.react';
import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {getWalletAddress} from './services';
import './styled.css';

const DepositComponent = () => {
  const {t} = useTranslation();
  const [state, setState] = useState({
    show: false,
    trc20: null,
    erc20: null,
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
    navigator.clipboard.writeText(state[state.type]);
  };

  const _selectCurrency = (currency: 'trc20' | 'erc20') => () => {
    setState({...state, type: currency});
  };

  return (
    <>
      <button type="button" className="btn btn-sm btn-info mr-2" onClick={handleShow}>
        {t('common:wallet.deposit')}
      </button>
      <Modal show={state.show} onHide={handleClose} backdrop="static" keyboard={false} dialogClassName="modal-deposit">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">{t('common:wallet.depositModal1')}</h2>
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
            {t('common:wallet.depositModal2')}
            {state.type === 'trc20' ? 'TRC20' : 'ERC20'}.
          </p>
          <p className="text-center">{t('common:wallet.depositModal3')}</p>
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
                  {t('common:wallet.copy')}
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <h6 className="text-center text-danger">
            {t('common:wallet.depositModal4')} {state.type === 'trc20' ? '20' : '50'} {t('common:wallet.depositModal5')}
          </h6>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(DepositComponent);

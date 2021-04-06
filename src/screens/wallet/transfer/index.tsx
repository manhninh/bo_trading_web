import UsdtPng from 'assets/images/usdt.png';
import WithdrawWalletPng from 'assets/images/withdraw_wallet.png';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './styled.css';

const TransferComponent = () => {
  const [state, setState] = useState({
    show: false
  });

  const handleClose = () => setState(state => ({ ...state, show: false }));
  const handleShow = () => setState(state => ({ ...state, show: true }));

  return (
    <>
      <button type="button" className="btn btn-warning mx-3" onClick={handleShow}>TRANSFER</button>
      <Modal
        show={state.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-500w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={UsdtPng} alt="..." className="img-fluid w-70" />
            <h2 className="mb-0 text-primary d-inline-block title-modal">Transfer Money</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="statistic-block p-0 pb-2">
            <div className="progress-details d-flex align-items-end justify-content-between">
              <div className="title">
                <div className="icon text-center mb-2">
                  <i className="icon-user-1 text-primary" />
                </div>
                <strong className="text-primary">Available Balance</strong>
              </div>
              <div className="number dashtext-1 text-primary text-bold">$ 27.000.000</div>
            </div>
          </div>
          <form className="form-validate">
            <div className="form-group">
              <label className="form-control-label">Amount <span className="text-danger">*</span></label>
              <input type="text" className="form-control is-invalid" autoFocus={true} />
              <div className="is-invalid invalid-feedback">Please enter amount</div>
            </div>
            <div className="form-group">
              <label className="form-control-label">Receiver Username <span className="text-danger">*</span></label>
              <input type="text" className="form-control" />
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">Password <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" />
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">Two-factor authentication</label>
                  <input type="text" className="form-control" maxLength={6} />
                </div>
              </div>
            </div>
            <input type="button" value="TRANSFER" className="btn btn-block btn-warning" />
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

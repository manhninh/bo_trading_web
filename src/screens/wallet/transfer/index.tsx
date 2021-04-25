import UsdtPng from 'assets/images/usdt.png';
import WithdrawWalletPng from 'assets/images/withdraw_wallet.png';
import React, {useState} from 'react';
import {Form, Modal} from 'react-bootstrap';
import './styled.css';

const TransferComponent = () => {
  const [state, setState] = useState({
    show: false,
  });

  const handleClose = () => setState((state) => ({...state, show: false}));
  const handleShow = () => setState((state) => ({...state, show: true}));

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
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <div className="form-group">
                <label className="form-control-label">
                  Amount <span className="text-danger">*</span>
                </label>
                <input type="password" className="form-control form-control-sm" />
              </div>
            </div>
          </div>
          <div className="mb-2" style={{border: '1px solid #3d4148'}} />
          <div className="i-checks">
            <input type="radio" value="option2" className="radio-template" />
            <label>To Username</label>
          </div>
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <Form.Group className="mb-1">
                <Form.Label>From</Form.Label>
                <Form.Control as="select" size="sm">
                  <option>Wallet Spot</option>
                  <option>Wallet Trade</option>
                  <option>Wallet Expert</option>
                  <option>Wallet Copy Trade</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Group className="mb-1">
                <Form.Label>To</Form.Label>
                <Form.Control as="select" size="sm">
                  <option>Wallet Spot</option>
                  <option>Wallet Trade</option>
                  <option>Wallet Expert</option>
                  <option>Wallet Copy Trade</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-6 col-xs-12">
              <p className="text-right">Balance: 20 USDT</p>
            </div>
            <div className="col-md-6 col-xs-12">
              <p className="text-right">Balance: 20 USDT</p>
            </div>
          </div>
          <div className="mb-2" style={{border: '1px solid #3d4148'}} />
          <div className="i-checks">
            <input type="radio" value="option2" className="radio-template" />
            <label>In Account</label>
          </div>
          <div className="form">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">Receiver Username</label> <span className="text-danger">*</span>
                  <input type="text" className="form-control form-control-sm" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input type="password" className="form-control form-control-sm" />
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">Two-factor authentication</label>
                  <input type="text" className="form-control form-control-sm" maxLength={6} />
                </div>
              </div>
            </div>
            <input type="button" value="TRANSFER" className="btn btn-block btn-warning" />
          </div>
          <div className="text-center mt-4">
            <img src={WithdrawWalletPng} alt="..." className="img-fluid w-150" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(TransferComponent);

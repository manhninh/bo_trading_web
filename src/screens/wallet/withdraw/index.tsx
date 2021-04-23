import UsdtPng from 'assets/images/usdt.png';
import WithdrawWalletPng from 'assets/images/withdraw_wallet.png';
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './styled.css';

const WithdrawComponent = () => {
  const [state, setState] = useState({
    show: false,
  });

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
              <Button className="btn-info mr-3 btn-sm">ERC20</Button>
              <Button className="btn-outline-secondary btn-sm">TRC20</Button>
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
                  <input type="text" className="form-control form-control-sm" autoFocus={true} />
                  <div className="is-invalid invalid-feedback">Please enter amount</div>
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
            <input type="button" value="WITHDRAW" className="btn btn-block btn-success" />
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

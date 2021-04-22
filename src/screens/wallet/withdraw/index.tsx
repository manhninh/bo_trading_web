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
          <div className="form-group text-center">
            <Button className="btn-info btn-lg mr-3">ERC20</Button>
            <Button className="btn-outline-secondary btn-lg">TRC20</Button>
          </div>
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
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Amount <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control is-invalid" autoFocus={true} />
                  <div className="is-invalid invalid-feedback">Please enter amount</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <p className="mb-2 text-gray-light">
                  Withdraw fees:
                  <br />
                  Net Amount:
                </p>
              </div>
              <div className="col-6 text-right">
                <p className="mb-2 text-gray-light">
                  <strong>$ 20 USDT</strong>
                  <br />
                  <strong>$ 0 USDT</strong>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Address USDT - ERC20 <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Password <span className="text-danger">*</span>
                  </label>
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

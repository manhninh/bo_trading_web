import UsdtPng from 'assets/images/usdt.png';
import QRCode from 'qrcode.react';
import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import './styled.css';

const DepositComponent = () => {
  const [state, setState] = useState({
    show: false,
  });

  const handleClose = () => setState((state) => ({...state, show: false}));
  const handleShow = () => setState((state) => ({...state, show: true}));

  return (
    <>
      <button type="button" className="btn btn-sm btn-info" onClick={handleShow}>
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
            <Button className="btn-info btn-sm mr-3">ERC20</Button>
            <Button className="btn-outline-secondary btn-sm">TRC20</Button>
          </div>
          <p className="text-center mb-0">This is wallet's deposit address, which accepts only USDT.ERC20.</p>
          <p className="text-center">Please do not deposit other cryptocurrency</p>
          <div className="text-center mb-3">
            <QRCode value="http://facebook.github.io/react/" renderAs="svg" includeMargin={true} level="H" size={200} />
          </div>
          <div className="form-group mb-2">
            <div className="input-group">
              <input type="text" className="form-control form-control-sm" disabled={true} readOnly={true} />
              <div className="input-group-append">
                <button type="button" className="btn btn-sm btn-primary">
                  Copy
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

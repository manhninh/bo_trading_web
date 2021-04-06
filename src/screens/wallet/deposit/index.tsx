import UsdtPng from 'assets/images/usdt.png';
import QRCode from "qrcode.react";
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './styled.css';

const DepositComponent = () => {
  const [state, setState] = useState({
    show: false
  });

  const handleClose = () => setState(state => ({ ...state, show: false }));
  const handleShow = () => setState(state => ({ ...state, show: true }));

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>DEPOSIT</button>
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
            <h2 className="mb-0 text-primary d-inline-block title-modal">Deposit Money</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-center">This is wallet's deposit address, which accepts only USDT.ERC20.</h6>
          <h6 className="text-center mb-3">Please do not deposit other cryptocurrency</h6>
          <form>
            <div className="form-group">
              <div className="input-group">
                <input type="text" className="form-control" disabled={true} readOnly={true} />
                <div className="input-group-append">
                  <button type="button" className="btn btn-primary">Copy</button>
                </div>
              </div>
            </div>
          </form>
          <div className="text-center">
            <QRCode value="http://facebook.github.io/react/" renderAs="svg" includeMargin={true} level="H" size={256} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <h6 className="text-center text-danger">Note: The minimum deposit amount is 30 USDT, less than this amount will not be credited to your balance wallet</h6>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(DepositComponent);

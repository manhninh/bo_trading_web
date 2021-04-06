import QRCode from "qrcode.react";
import React from 'react';
import './styled.css';

const TwoAuthenComponent = () => {
  return <div className="row mt-3">
    <div className="col-12">
      <form className="card mb-2">
        <div className="card-header">
          <h3 className="card-title text-danger">Setup 2FA</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <h4 className="text-warning">Step 1</h4>
              <span><strong>Download an Authenticator App</strong> to your Smart phone or table that has a camera. We recommends using one of the fllowing free apps, from either the Google Play Store or the Apple App Store:</span>
              <p className="mt-3 text-bold">Google Authenticator</p>
              <img src={`${process.env.PUBLIC_URL}/img/google-authenticator.png`} className="w-60" />
              <p className="mt-3 text-bold">Authy 2-Factor Authentication</p>
              <img src={`${process.env.PUBLIC_URL}/img/authy.png`} className="w-60" />
            </div>
            <div className="col-lg-4 col-sm-12">
              <h4 className="text-warning">Step 2</h4>
              <span>Open your app and <strong>scan the QR code</strong> below</span>
              <div className="mt-3">
                <QRCode value="http://facebook.github.io/react/" renderAs="svg" includeMargin={true} level="H" size={220} />
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <h3 className="text-warning">Step 3</h3>
              <span><strong>Enter the verification code</strong> from your Authenticator app in the field below:</span>
              <form className="mt-3">
                <div className="form-group">
                  <label className="form-control-label">Enter login password</label>
                  <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-control-label">Enter 2FA code from the app</label>
                  <input type="password" className="form-control" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="card-footer text-right">
          <button type="submit" className="btn btn-danger">Complete Setup</button>
        </div>
      </form>
    </div>
  </div>;
};

export default React.memo(TwoAuthenComponent);

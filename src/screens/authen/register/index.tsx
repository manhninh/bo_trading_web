import BgLogin from "assets/images/bg_login.png";
import React from 'react';
import { ROUTE_PATH } from "routers/helpers";
import "./styled.css";

const RegisterComponent = () => {
  return <div className="login-page">
    <div className="container d-flex align-items-center">
      <div className="form-holder has-shadow">
        <div className="row">
          <div className="col-lg-6">
            <div className="info d-flex align-items-center" style={{ backgroundImage: `url(${BgLogin})`, backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover" }}>
              <div className="content">
                <div className="logo">
                  <h1 className="d-inline-block">IOGO</h1> <h1 className="d-inline-block text-danger">ETH</h1>
                </div>
                <p>Nơi chấp cánh những giấc mơ biệt thự và siêu xe</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form d-flex align-items-center">
              <div className="content">
                <a href={ROUTE_PATH.DASHBOARD} className="logo-link">
                  <div className="text-uppercase">
                    <strong className="logoIOGO">IOGO</strong>
                    <strong className="logoETH">ETH</strong>
                  </div>
                </a>
                <form className="form-validate">
                  <div className="form-group">
                    <label>Referral User:</label> <label className="text-primary text-bold">None</label>
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input id="register-username" type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input id="register-email" type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input id="register-password" type="text" className="form-control" />
                  </div>
                  <div className="form-group terms-conditions text-center">
                    <input id="register-agree" name="registerAgree" type="checkbox" className="checkbox-template" />
                    <label htmlFor="register-agree">I agree with the terms and policy</label>
                  </div>
                  <div className="form-group text-center">
                    <input id="register" type="button" value="Register" className="btn btn-primary" />
                  </div>
                </form>
                <small>Already have an account? </small>
                <a href={ROUTE_PATH.LOGIN} className="signup">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default React.memo(RegisterComponent);

import { yupResolver } from '@hookform/resolvers/yup';
import BgLogin from "assets/images/bg_login.png";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ROUTE_PATH } from 'routers/helpers';
import { fetchLogin } from 'routers/redux/thunks';
import * as yup from 'yup';
import "./styled.css";

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Tài khoản không được để trống!'),
  password: yup.string().required('Mật khẩu không được để trống!'),
});

const LogInFormComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => { }, []);

  const { control, handleSubmit } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await dispatch(fetchLogin({ username: data.username, password: data.password }));
    } catch (error) {
    } finally {
    }
  };

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
                    <label>Email or Username</label>
                    <input id="login-username" type="text" name="loginUsername" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input id="login-password" type="password" name="loginPassword" className="form-control" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <br />
                <a href="#" className="forgot-pass">Forgot Password?</a>
                <br />
                <br />
                <small>Do not have an account? </small>
                <a href={ROUTE_PATH.REGISTER} className="signup">Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default React.memo(LogInFormComponent);

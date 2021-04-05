import { yupResolver } from '@hookform/resolvers/yup';
import { isLoading } from 'containers/redux/slice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Transition, TransitionStatus } from 'react-transition-group';
import { ROUTE_PATH } from 'routers/helpers';
import * as yup from 'yup';
import { Props, State } from './propState';
import "./styled.css";

const duration = 200;

interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Tài khoản không được để trống!'),
  password: yup.string().required('Mật khẩu không được để trống!'),
});

const RegisterComponent = (props: Props) => {
  const dispatch = useDispatch();

  const [state, setState] = useState<State>({
    username: "",
    password: "",
    isOpen: false
  });

  useEffect(() => {
    setState(state => ({ ...state, isOpen: props.isOpen }));
  }, [props.isOpen]);

  const toogleForm = () => {
    setState(state => ({ ...state, isOpen: !state.isOpen }));
    props.callbackToogle();
  };

  const { control, handleSubmit, errors } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    dispatch(isLoading(true));
    try {
    } catch (error) {
    } finally {
      dispatch(isLoading(false));
    }
  };

  const sidebarTransitionStyles = {
    entering: { width: 0 },
    entered: { width: '400px' },
    exiting: { width: '400px' },
    exited: { width: 0 }
  };

  return <Transition in={state.isOpen} timeout={duration}>
    {(state: TransitionStatus) => (
      <div className="form-container" style={{
        transition: `width ${duration}ms ease-in-out`,
        ...sidebarTransitionStyles[state]
      }}>
        <div className="p-40">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-outline-secondary" onClick={toogleForm}>
              <i className="fas fa-times" />
            </button>
          </div>
          <div className="text-center">
            <h1 className="display-4 text-gray-light mb-3">Register</h1>
            <p className="text-muted">Welcome to IOGO ETH</p>
          </div>
          <form className="form-validate">
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" />
            </div>
            <div className="form-group terms-conditions mb-4">
              <input name="registerAgree" type="checkbox" className="checkbox-template" />
              <label htmlFor="register-agree">I agree with the terms and policy</label>
            </div>
            <button className="btn btn-lg btn-block btn-primary mb-3">Create Account</button>
            <p className="text-center"><small className="text-muted text-center">
              Already have an account? <a href={ROUTE_PATH.LOGIN}>Login</a>.</small></p>
          </form>
        </div>
      </div>
    )
    }
  </Transition>;
};

export default React.memo(RegisterComponent);

import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useState} from 'react';
import './styled.css';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ROUTE_PATH} from 'routers/helpers';
import {postForgotPassword} from './services';

interface IFormInputs {
  username: string;
}

const ForgotPasswordComponent = () => {
  const {addError} = useError();
  const [showMess, setShowMess] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required('Username or Email cannot be empty!'),
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      postForgotPassword(data.username);
      setShowMess(true);
    } catch (err) {
      addError(err, 'Forgot password fail');
    }
  };

  return (
    <>
      <div className="background-img" />
      <section className="forms m-t-10-per">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="card p-5 card-custom">
                <div className="row">
                  <div className="col text-center">
                    <div className="brand-big text-uppercase mb-4">
                      <img src={process.env.PUBLIC_URL + '/logo512.png'} className="footer-img" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <form className="form-validate w-400" style={{margin: '0 auto'}}>
                      {!showMess ? (
                        <>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              autoFocus
                              type="text"
                              placeholder="Enter the email you used to sign up for the account"
                              className={`form-control form-control-sm ${errors.username?.message ? 'is-invalid' : ''}`}
                              {...register('username')}
                            />
                            <div className="is-invalid invalid-feedback">{errors.username?.message}</div>
                          </div>
                          <button className="btn btn-sm btn-block btn-danger mb-3" onClick={handleSubmit(onSubmit)}>
                            Send email
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="mb-4 text-warning">
                            A new password has been sent to your email. Please check your email!
                          </p>
                          <a href={ROUTE_PATH.TRADE} className="btn btn-sm btn-block btn-danger">
                            Go to Home
                          </a>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(ForgotPasswordComponent);

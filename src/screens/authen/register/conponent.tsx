import {yupResolver} from '@hookform/resolvers/yup';
import {isLoading} from 'containers/redux/slice';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import './styled.css';

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup.string().required('Username cannot be empty!'),
  email: yup.string().email('Email is not in the correct format!').required('Email cannot be empty!'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters!')
    .max(20, 'Password must be at most 20 characters!')
    .required('Password cannot be empty!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password is not match')
    .required('Confirm password cannot be empty!'),
});

const RegisterComponent = () => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  return (
    <form className="form-validate">
      <div className="form-group mb-2">
        <label>Referral User:</label> <label className="text-primary text-bold">None</label>
      </div>
      <div className="form-group mb-2">
        <label>
          Username <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={errors.username?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('username')}
        />
        <div className="is-invalid invalid-feedback">{errors.username?.message}</div>
      </div>
      <div className="form-group mb-2">
        <label>
          Email <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={errors.email?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('email')}
        />
        <div className="is-invalid invalid-feedback">{errors.email?.message}</div>
      </div>
      <div className="form-group mb-2">
        <label>
          Password <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={errors.password?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('password')}
        />
        <div className="is-invalid invalid-feedback">{errors.password?.message}</div>
      </div>
      <div className="form-group mb-2">
        <label>
          Confirm Password <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={errors.confirmPassword?.message ? 'form-control is-invalid' : 'form-control'}
          {...register('confirmPassword')}
        />
        <div className="is-invalid invalid-feedback">{errors.confirmPassword?.message}</div>
      </div>
      <div className="form-group mb-2 terms-conditions text-center">
        <input
          id="register-agree"
          name="registerAgree"
          type="checkbox"
          className="checkbox-template"
          defaultChecked={true}
        />
        <label htmlFor="register-agree">I agree with the terms and policy</label>
      </div>
      <button className="btn btn-lg btn-block btn-danger mb-3" onClick={handleSubmit(onSubmit)}>
        Create Account
      </button>
    </form>
  );
};

export default React.memo(RegisterComponent);

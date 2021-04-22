import {yupResolver} from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {changeStatusTFA} from 'routers/redux/slice';
import * as yup from 'yup';
import './styled.css';
import {IFormConfirmMFA} from './twoAuthen';
import {disableMfa, verifyOTPToken} from './twoAuthen/services';

type IProps = {
  openModal: boolean;
  onChangeOpenModal: () => void;
};

const Props: IProps = {
  openModal: false,
  onChangeOpenModal: () => {},
};

const schema = yup.object().shape({
  password: yup.string().required('Password cannot be empty!'),
  code: yup.string().when('password', {
    is: (password) => !!password,
    then: yup.string().required('2FA code cannot be empty!'),
    otherwise: yup.string(),
  }),
});

const DisableTFAComponent = (props: IProps = Props) => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();

  useEffect(() => {}, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<IFormConfirmMFA>({
    defaultValues: {
      password: '',
      code: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormConfirmMFA) => {
    showLoading();
    try {
      console.log(data);
      const result = await verifyOTPToken(data);
      if (result) {
        const disabled = await disableMfa();
        if (disabled) {
          dispatch(changeStatusTFA(false));
          props.onChangeOpenModal();
        }
      }
    } catch (error) {
      addError(error, 'Verify authentication code failed! Please check your information.');
    } finally {
      hideLoading();
    }
  };

  return (
    <Modal
      onHide={props.onChangeOpenModal}
      show={props.openModal}
      centered={true}
      dialogClassName="modal-w-90-per"
      contentClassName="modal-content-custom">
      <Modal.Header closeButton>
        <Modal.Title>
          <h4 className="mb-0 text-primary d-inline-block title-modal">Disable Two-factor authentication</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        <form className="card mb-2">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={errors.password?.message ? 'form-control is-invalid' : 'form-control'}
                    {...register('password')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.password?.message}
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-12">
                <div className="form-group">
                  <label className="form-label">2FA Code</label>
                  <input
                    type="text"
                    className={errors.code?.message ? 'form-control is-invalid' : 'form-control'}
                    {...register('code')}
                  />
                  <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                    {errors.code?.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-danger" onClick={handleSubmit(onSubmit)}>
              Disable
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(DisableTFAComponent);

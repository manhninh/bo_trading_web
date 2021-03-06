import {yupResolver} from '@hookform/resolvers/yup';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React from 'react';
import {Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
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

const DisableTFAComponent = (props: IProps = Props) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();

  const schema = yup.object().shape({
    password: yup.string().required(t('common:setting.validPassword')),
    code: yup.string().when('password', {
      is: (password) => !!password,
      then: yup.string().required(t('common:setting.valid2fa')),
      otherwise: yup.string(),
    }),
  });

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
    <Modal onHide={props.onChangeOpenModal} show={props.openModal} centered={true}>
      <Modal.Header closeButton>
        <Modal.Title className="mb-0">
          <h5 className="mb-0 text-primary d-inline-block title-modal">{t('common:setting.disabled2fa')}</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <div className="form-group">
              <label className="form-label">{t('common:setting.password')}</label>
              <input
                type="password"
                className={`form-control form-control-sm ${errors.password?.message ? 'is-invalid' : ''}`}
                {...register('password')}
              />
              <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                {errors.password?.message}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12">
            <div className="form-group mb-0">
              <label className="form-label">{t('common:setting.2facode')}</label>
              <input
                type="text"
                className={`form-control form-control-sm ${errors.code?.message ? 'is-invalid' : ''}`}
                {...register('code')}
              />
              <div className="is-invalid invalid-feedback" style={{display: 'block'}}>
                {errors.code?.message}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit" className="btn btn-sm btn-danger" onClick={handleSubmit(onSubmit)}>
          {t('common:setting.disabled')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(DisableTFAComponent);

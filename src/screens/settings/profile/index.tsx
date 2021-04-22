import {yupResolver} from '@hookform/resolvers/yup';
import {useAppSelector} from 'boot/configureStore';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useCallback, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';
import {fetchUpdateUser} from './services';
import './styled.css';
interface IFormProfile {
  username: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  // address: string;
  avatar: any;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email!'),
  phone: yup.string().matches(phoneRegExp, {excludeEmptyString: false, message: 'Phone number is not valid'}),
});

const ImageforwardRef = ({onChangeAvatar, onSelectFile}, ref: React.LegacyRef<HTMLInputElement>) => {
  const avatarDefault = `${process.env.PUBLIC_URL}/img/user.png`;
  const [avatar, setAvatar] = useState<string>(avatarDefault);

  const _onChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = URL.createObjectURL(event.target.files?.item(0));
    onChangeAvatar(event);
    setAvatar(avatar);
  };

  return (
    <>
      <input type="file" id="file" ref={ref} onChange={_onChangeAvatar} style={{display: 'none'}} />
      <img src={avatar} className="card-profile-img avatar-profile" />
      <h4 className="mb-3 text-gray-light">Nathan Andrews</h4>
      <button className="btn btn-outline-secondary" onClick={onSelectFile}>
        <span className="fas fa-camera"></span> Change avatar
      </button>
    </>
  );
};

const Avatar = React.forwardRef(ImageforwardRef);

const ProflieSettingComponent = () => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const inputFile = useRef<HTMLInputElement>(null);
  const authState = useAppSelector((state) => state.authState);

  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    setValue,
  } = useForm<IFormProfile>({
    defaultValues: {
      username: authState.accountInfor.username,
      full_name: authState.accountInfor.full_name,
      email: authState.accountInfor.email,
      phone: authState.accountInfor.phone,
      avatar: null,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormProfile) => {
    try {
      showLoading();
      console.log(data);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        data[key] && formData.append(key, data[key]);
      });
      const res = await fetchUpdateUser(formData);
    } catch (error) {
      addError(error, 'Account registration failed! Please check your information.');
    } finally {
      setTimeout(() => {
        hideLoading();
      }, 3000);
    }
  };

  const onSelectFile = useCallback(() => {
    inputFile.current?.click();
  }, []);

  const onChangeAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files?.item(0));
    const avatar = URL.createObjectURL(event.target.files?.item(0));
    setValue('avatar', event.target.files?.item(0), {shouldDirty: true});
  }, []);

  return (
    <div className="row mt-3">
      <div className="col-lg-4 col-xs-12">
        <div className="card card-profile mb-2">
          <div
            style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/paul-morris-116514-unsplash.jpg)`}}
            className="card-header"></div>
          <div className="card-body text-center">
            <Avatar onChangeAvatar={onChangeAvatar} onSelectFile={onSelectFile} ref={inputFile} />
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-xs-12">
        <form className="card mb-2">
          <div className="card-header">
            <h3 className="card-title text-danger">Edit Profile</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" {...register('username')} />
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" {...register('full_name')} />
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    {...register('email')}
                    className={errors.email?.message ? 'form-control is-invalid' : 'form-control'}
                  />
                  <div className="is-invalid invalid-feedback">{errors.email?.message}</div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input type="number" className="form-control" {...register('phone')} />
                </div>
              </div>
              {/* <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" {...register('address')} />
                </div>
              </div> */}
            </div>
          </div>
          <div className="card-footer text-right">
            <button type="submit" className="btn btn-danger" onClick={handleSubmit(onSubmit)}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ProflieSettingComponent);

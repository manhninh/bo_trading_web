import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './styled.css';

const EnableTFAComponent = () => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();

  useEffect(() => {}, []);
  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="card mb-2">
          <div className="card-header">
            <h3 className="card-title text-danger title-tfa">
              <span>Two-Factor Authentication</span>
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="user-block block text-center">
                  <b>Two-Factor authentication is enabled.</b>
                  <p>
                    If you want to switch to a new device, disable two-factor authentication, then enable it again using
                    the new device. <a href="#">Learn more</a>
                  </p>

                  <div className="mb-2 row justify-content-center">
                    <div className="btn-group mr-4" role="group" aria-label="First group">
                      <button type="button" className="btn btn-secondary btn-disable-twa">
                        Disable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EnableTFAComponent);

import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import DisableTFAComponent from 'screens/settings/security/disableTFA';
import './styled.css';
const EnableTFAComponent = () => {
  const dispatch = useDispatch();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [openDisableTFA, setOpenDisableTFA] = useState<boolean>(false);

  useEffect(() => {}, []);

  const _showHideDisableTFA = () => {
    setOpenDisableTFA(!openDisableTFA);
  };
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
                    the new device.
                  </p>
                  <div className="mb-2 row justify-content-center">
                    <div className="btn-group mr-4" role="group" aria-label="First group">
                      <button type="button" className="btn btn-secondary btn-disable-twa" onClick={_showHideDisableTFA}>
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
      <DisableTFAComponent openModal={openDisableTFA} onChangeOpenModal={_showHideDisableTFA} />
    </div>
  );
};

export default React.memo(EnableTFAComponent);

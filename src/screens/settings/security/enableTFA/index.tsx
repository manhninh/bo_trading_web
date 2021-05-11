import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import DisableTFAComponent from 'screens/settings/security/disableTFA';
import './styled.css';

const EnableTFAComponent = () => {
  const {t} = useTranslation();
  const [openDisableTFA, setOpenDisableTFA] = useState<boolean>(false);

  const _showHideDisableTFA = () => {
    setOpenDisableTFA(!openDisableTFA);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card mb-2">
          <div className="card-header px-0">
            <h3 className="card-title text-danger title-tfa">
              <span>{t('common:setting.2fa')}</span>
            </h3>
          </div>
          <div className="card-body px-0">
            <div className="row">
              <div className="col-lg-12">
                <div className="user-block block text-center">
                  <b>{t('common:setting.2faEnabled')}</b>
                  <p>{t('common:setting.2faTitle')}</p>
                  <div className="mb-2 row justify-content-center">
                    <div className="btn-group mr-4" role="group" aria-label="First group">
                      <button type="button" className="btn btn-secondary btn-disable-twa" onClick={_showHideDisableTFA}>
                        {t('common:setting.2faDisabled')}
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

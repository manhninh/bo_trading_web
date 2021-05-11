import React from 'react';
import {useTranslation} from 'react-i18next';
import {ROUTE_PATH} from 'routers/helpers';

const WellcomeComponent = () => {
  const {t} = useTranslation();
  return (
    <>
      <div className="background-img" />
      <section className="forms" style={{marginTop: '10%'}}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="card p-5" style={{backgroundColor: 'transparent', border: 0, boxShadow: 'none'}}>
                <div className="row">
                  <div className="col text-center">
                    <h1 className="mb-3 text-info" style={{fontSize: '50px'}}>
                      {t('common:authen.wellcome')}
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <p className="mb-1 text-light">{t('common:authen.checkEmail')}</p>
                    <p className="mb-4 text-light">{t('common:authen.wellcomeTitle')}</p>
                    <a href={ROUTE_PATH.TRADE} className="btn btn-danger">
                      {t('common:authen.gotoHome')}
                    </a>
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

export default React.memo(WellcomeComponent);

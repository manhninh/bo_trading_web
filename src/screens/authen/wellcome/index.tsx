import React from 'react';
import { useTranslation } from 'react-i18next';
import { ROUTE_PATH } from 'routers/helpers';
import "./styled.css";

const WellcomeComponent = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="background-img" />
      <section className="forms m-t-10-percen">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="card p-5 card-custom">
                <div className="row">
                  <div className="col text-center">
                    <h1 className="mb-3 text-info f-50">
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

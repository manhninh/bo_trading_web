import ActivateImg from 'assets/images/image_activate.png';
import InviteFriendImg from 'assets/images/image_friend.png';
import MemberF1Img from 'assets/images/image_member_f1.png';
import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout/Container';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {restoreAccount} from 'routers/redux/slice';
import {fetchBuySponsor} from './services';
import './styled.css';

const AffiliateLinkComponent = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const affiliateLink = useAppSelector((state) => state.authState.accountInfor.ref_code);
  const is_sponsor = useAppSelector((state) => state.authState.accountInfor.is_sponsor);

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const buySponsor = async () => {
    showLoading();
    try {
      const result = await fetchBuySponsor();
      if (result) {
        const accountInfor: any = {is_sponsor: true};
        dispatch(restoreAccount(accountInfor));
        setShowModal(false);
      }
    } catch (error) {
      addError(error, 'Buy Sponsor Fail!');
    } finally {
      hideLoading();
    }
  };

  return (
    <ContainerLayout>
      <>
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
              <h1 className="mb-2 mb-sm-0 text-light" color="text">
                {t('common:affiliateLink.title1')}
              </h1>
            </div>
            {!is_sponsor ? (
              <button type="button" className="btn btn-lg btn-danger mb-5" onClick={toogleModal}>
                {t('common:affiliateLink.buyNow')}
              </button>
            ) : null}
          </div>
          <div className="col-lg-6">
            <div className="block">
              <div className="title text-light">
                <strong>{t('common:affiliateLink.title2')}</strong>
              </div>
              <div className="block-body">
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        disabled={true}
                        readOnly={true}
                        value={`${config.WEB}/register?sponsor=${affiliateLink}`}
                      />
                      <div className="input-group-append">
                        <CopyToClipboard text={`${config.WEB}/register?sponsor=${affiliateLink}`}>
                          <button type="button" className="btn btn-sm btn-danger">
                            {t('common:affiliateLink.copy')}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="user-block block text-center">
              <img src={InviteFriendImg} alt="..." className="img-fluid" />
              <a href="#" className="user-title">
                <h3 className="h5 text-light">{t('common:affiliateLink.title3')}</h3>
              </a>
              <div className="contributions text-light">{t('common:affiliateLink.subTitle3')}</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="user-block block text-center">
              <img src={MemberF1Img} alt="..." className="img-fluid" />
              <a href="#" className="user-title">
                <h3 className="h5 text-light">{t('common:affiliateLink.title4')}</h3>
              </a>
              <div className="contributions text-light">{t('common:affiliateLink.subTitle4')}</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="user-block block text-center">
              <img src={ActivateImg} alt="..." className="img-fluid" />
              <a href="#" className="user-title">
                <h3 className="h5 text-light">{t('common:affiliateLink.title5')}</h3>
              </a>
              <div className="contributions text-light">{t('common:affiliateLink.subTitle5')}</div>
            </div>
          </div>
        </div>
        <Modal show={showModal} centered={true} onHide={toogleModal}>
          <Modal.Body>
            <p className="text-light">
              {t('common:affiliateLink.title6')}{' '}
              <span className="text-danger text-bold">{t('common:affiliateLink.title7')}</span>{' '}
              {t('common:affiliateLink.title8')}
            </p>
            <div className="text-right">
              <button type="submit" className="btn btn-sm btn-info mr-2" onClick={buySponsor}>
                {t('common:affiliateLink.title9')}
              </button>
              <button type="submit" className="btn btn-sm btn-danger" onClick={toogleModal}>
                {t('common:affiliateLink.title10')}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </ContainerLayout>
  );
};

export default React.memo(AffiliateLinkComponent);

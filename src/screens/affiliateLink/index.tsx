import ActivateImg from 'assets/images/image_activate.png';
import InviteFriendImg from 'assets/images/image_friend.png';
import MemberF1Img from 'assets/images/image_member_f1.png';
import {useAppSelector} from 'boot/configureStore';
import config from 'constants/config';
import ContainerLayout from 'containers/components/layout/Container';
import React from 'react';
import './styled.css';

const AffiliateLinkComponent = () => {
  const affiliateLink = useAppSelector((state) => state.authState.accountInfor.ref_code);

  return (
    <ContainerLayout>
      <>
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mb-4">
              <h1 className="mb-2 mb-sm-0 text-light" color="text">
                You need to buy Agency license to receive Agency Commissions and Trading Commissions
              </h1>
            </div>
            <button type="button" className="btn btn-lg btn-danger mb-5">
              Buy Now
            </button>
          </div>
          <div className="col-lg-6">
            <div className="block">
              <div className="title text-light">
                <strong>Copy Affiliate Link & send to your friends</strong>
              </div>
              <div className="block-body">
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        disabled={true}
                        readOnly={true}
                        value={`${config.WEB}/register?sponsor=${affiliateLink}`}
                      />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-sm btn-danger">
                          Copy
                        </button>
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
                <h3 className="h5 text-light">1. Invite Friends</h3>
              </a>
              <div className="contributions text-light">Invite friends to register youweb through the link copy</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="user-block block text-center">
              <img src={MemberF1Img} alt="..." className="img-fluid" />
              <a href="#" className="user-title">
                <h3 className="h5 text-light">2. Member F1</h3>
              </a>
              <div className="contributions text-light">Each subscriber from the link becomes F1 in your system</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="user-block block text-center">
              <img src={ActivateImg} alt="..." className="img-fluid" />
              <a href="#" className="user-title">
                <h3 className="h5 text-light">3. Activate & Receive IB Commissions</h3>
              </a>
              <div className="contributions text-light">Each subscriber from the link becomes F1 in your system</div>
            </div>
          </div>
        </div>
      </>
    </ContainerLayout>
  );
};

export default React.memo(AffiliateLinkComponent);

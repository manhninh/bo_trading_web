import HeaderLayout from 'containers/components/layout/Header';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React, {useState} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import { ROUTE_PATH } from 'routers/helpers';
import './styled.css';

const DashboardComponent = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const _gotoLogin = () => setOpenLogin(true);

  const cbOpenLogin = () => setOpenLogin(false);

  const _gotoRegister = () => setOpenRegister(true);

  const cbOpenRegister = () => setOpenRegister(false);

  return (
    <LoadingProvider>
      <Scrollbars
        style={{
          height: '100vh',
          display: 'block',
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/background.jpg)`,
        }}>
        <header>
          <HeaderLayout
            noBackground={true}
            openLogin={openLogin}
            openRegister={openRegister}
            cbOpenLogin={cbOpenLogin}
            cbOpenRegister={cbOpenRegister}
          />
          <div className="content-header d-block">
            <div className="container">
              <div className="title text-center">
                <h2>SIMPLE BUT POWERFUL</h2>
                <p>TRADING PLATFORM</p>
                <span>
                  With Finimix, profit is not the most impimpotant goal. We focus on customers, take security seriously
                  and care about the interests of customers first. Finimix aims to be a premium trading asset in binary
                  option trading and to accompany customers to build their own future
                </span>
                <div className=" d-flex align-items-center justify-content-center">
                  <button onClick={_gotoLogin}>START TRADING</button>
                </div>
              </div>

              <div className="banner-header d-flex justify-content-center">
                <img src={process.env.PUBLIC_URL + '/img/banner-header.png'} alt="" />
              </div>
            </div>
          </div>
        </header>
        <div className="wrapper">
          <div className="why-choose-us">
            <div className="container">
              <img className="mb-3" src={process.env.PUBLIC_URL + '/img/tit_why.png'} alt="" />
              <div className="d-flex justify-content-center">
                <img className="image-content" src={process.env.PUBLIC_URL + '/img/round_1.png'} alt="" />
              </div>
            </div>
          </div>
          <div className="what-we-have">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-right col-sm-12">
                  <img className="img_title" src={process.env.PUBLIC_URL + '/img/tit_what.png'} alt="" />
                  <div className="d-flex zly3 align-items-center">
                    <img src={process.env.PUBLIC_URL + '/img/Frame.png'} alt="" />
                    <span>Optimal blockchain system</span>
                  </div>
                  <div className="d-flex zly3 align-items-center">
                    <img src={process.env.PUBLIC_URL + '/img/Frame-1.png'} alt="" />
                    <span>Unlimitted demo</span>
                  </div>
                  <div className="d-flex zly3 align-items-center">
                    <img src={process.env.PUBLIC_URL + '/img/Frame-2.png'} alt="" />
                    <span>Smart trading room</span>
                  </div>
                  <div className="d-flex zly3 align-items-center">
                    <img src={process.env.PUBLIC_URL + '/img/Frame-3.png'} alt="" />
                    <span>Affilicate agent program</span>
                  </div>
                </div>
                <div className="col-md-6 col-left col-sm-12">
                  <img src={process.env.PUBLIC_URL + '/img/trade_1.png'} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="with-finimix position-relative">
            <div className="container">
              <div className="title d-flex align-items-center justify-content-center">
                <img src={process.env.PUBLIC_URL + '/img/img-title.png'} alt="" />
              </div>
              <div className="content">
                <div className="d-flex step">
                  <img src={process.env.PUBLIC_URL + '/img/icon_4.png'} alt="" />
                  <div>
                    <p>REGISTER</p>
                    <span className="text-white">Open an acount FREE for just a few minute</span>
                  </div>
                </div>
                <div className="d-flex step">
                  <img src={process.env.PUBLIC_URL + '/img/icon_3.png'} alt="" />
                  <div>
                    <p>DEPOSIT</p>
                    <span className="text-white">Make a deposit into your account</span>
                  </div>
                </div>
                <div className="d-flex step">
                  <img src={process.env.PUBLIC_URL + '/img/icon_2.png'} alt="" />
                  <div>
                    <p>TRADE</p>
                    <span className="text-white">Use technical analysis for profitable investment</span>
                  </div>
                </div>
                <div className="d-flex step">
                  <img src={process.env.PUBLIC_URL + '/img/icon_1.png'} alt="" />
                  <div>
                    <p>WITHDRAW</p>
                    <span className="text-white">Get funs easily to your e-wallet in 1-3 working day</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <img className="img_start" src={process.env.PUBLIC_URL + '/img/logo-content.png'} alt="" />
              </div>
            </div>
          </div>
          <div className="join-finimix text-center">
            <div className="container">
              <p>JOIN FINIMIX NOW</p>
              <img src={process.env.PUBLIC_URL + '/img/image_09.png'} alt="" />
              <div className=" d-flex align-items-center justify-content-center">
                <button onClick={_gotoRegister}>CREATE AN ACCOUNT</button>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container d-flex justify-content-between">
            <div className="footer-left">
              <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" />
              <p>
                Finimix is developed by professionals with year of experience in the information technology, finace and
                crypto fields to create a smart, secure, relible and susrainable investment platform.
              </p>
            </div>
            <div className="footer-right d-flex justify-content-between">
              <a href={ROUTE_PATH.TERM_OF_USE}>
                Term of use
              </a>
              <a href={ROUTE_PATH.PRIVATE_POLICY}>Private Policy</a>
            </div>
          </div>
        </footer>
      </Scrollbars>
    </LoadingProvider>
  );
};

export default React.memo(DashboardComponent);

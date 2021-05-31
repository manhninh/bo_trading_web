import React from 'react';
import "../styled.css";

const CopyTradeComponent = () => {
  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="user-block block text-center block-copy-trade">
            <div className="avatar">
              <img src="https://d19m59y37dris4.cloudfront.net/dark-admin-premium/1-4-7/img/avatar-6.jpg" alt="..." className="img-fluid" />
              <div className="order dashbg-4">3rd</div>
            </div><a href="#" className="user-title">
              <h3 className="h5 text-light">Sebastian Wood</h3>
              <span className="text-info">5% profit share</span></a>
            <div className="contributions text-info">410 Copier</div>
            <div className="details d-flex justify-content-between align-items-center">
              <div className="item">
                <h6 className="text-light">In month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
              <div className="item">
                <h6 className="text-light">Last month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
            </div>
            <button type="button" className="btn btn-block btn-danger mt-3">Start Copy</button>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="user-block block text-center block-copy-trade">
            <div className="avatar">
              <img src="https://d19m59y37dris4.cloudfront.net/dark-admin-premium/1-4-7/img/avatar-6.jpg" alt="..." className="img-fluid" />
              <div className="order dashbg-4">3rd</div>
            </div><a href="#" className="user-title">
              <h3 className="h5 text-light">Sebastian Wood</h3><span className="text-info">5% profit share</span></a>
            <div className="contributions text-info">410 Copier</div>
            <div className="details d-flex justify-content-between align-items-center">
              <div className="item">
                <h6 className="text-light">In month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
              <div className="item">
                <h6 className="text-light">Last month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
            </div>
            <button type="button" className="btn btn-block btn-danger mt-3">Start Copy</button>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="user-block block text-center block-copy-trade">
            <div className="avatar">
              <img src="https://d19m59y37dris4.cloudfront.net/dark-admin-premium/1-4-7/img/avatar-6.jpg" alt="..." className="img-fluid" />
              <div className="order dashbg-4">3rd</div>
            </div><a href="#" className="user-title">
              <h3 className="h5 text-light">Sebastian Wood</h3><span className="text-info">5% profit share</span></a>
            <div className="contributions text-info">410 Copier</div>
            <div className="details d-flex justify-content-between align-items-center">
              <div className="item">
                <h6 className="text-light">In month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
              <div className="item">
                <h6 className="text-light">Last month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
            </div>
            <button type="button" className="btn btn-block btn-danger mt-3">Start Copy</button>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="user-block block text-center block-copy-trade">
            <div className="avatar">
              <img src="https://d19m59y37dris4.cloudfront.net/dark-admin-premium/1-4-7/img/avatar-6.jpg" alt="..." className="img-fluid" />
              <div className="order dashbg-4">3rd</div>
            </div><a href="#" className="user-title">
              <h3 className="h5 text-light">Sebastian Wood</h3><span className="text-info">5% profit share</span></a>
            <div className="contributions text-info">410 Copier</div>
            <div className="details d-flex justify-content-between align-items-center">
              <div className="item">
                <h6 className="text-light">In month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
              <div className="item">
                <h6 className="text-light">Last month</h6>
                <strong className="text-success">110% Profits</strong>
              </div>
            </div>
            <button type="button" className="btn btn-block btn-danger mt-3">Start Copy</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CopyTradeComponent);

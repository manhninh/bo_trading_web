import React from 'react';
import { ROUTE_PATH } from 'routers/helpers';

const WellcomeComponent = () => {
  return <>
    <div className="background-img" />
    <section className="forms" style={{ marginTop: "10%" }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="card p-5" style={{ backgroundColor: "transparent", border: 0, boxShadow: "none" }}>
              <div className="row">
                <div className="col text-center">
                  <h1 className="mb-3 text-light" style={{ fontSize: "50px" }}>
                    Wellcome to <span className="text-info">Finimix</span>
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <p className="mb-1 text-light">Please check your email</p>
                  <p className="mb-4 text-light">We have send registration confirmation email</p>
                  <a href={ROUTE_PATH.DASHBOARD} className="btn btn-danger">Go to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
};

export default React.memo(WellcomeComponent);

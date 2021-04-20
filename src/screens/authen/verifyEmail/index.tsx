import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {RouteComponentProps} from 'react-router';
import {ROUTE_PATH} from 'routers/helpers';
import {fetchVerifyUserInfor} from './services';
import './styled.css';

const VerifyEmailComponent = (props: RouteComponentProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    verification();
  }, []);

  const verification = async () => {
    let message = 'Your account does not exist. Register and start trading';
    const uuid = props.match.params['uuid'];
    if (uuid) {
      const res = await fetchVerifyUserInfor(uuid);
      if (res.data) message = res.data;
    }
    setMessage(message);
  };

  return (
    <>
      <div className="background-img" />
      <section className="forms m-t-10-per">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-12">
              <div className="card p-5 card-custom">
                <div className="row">
                  <div className="col text-center">
                    <h1 className="mb-3 text-light fontsize50">
                      IOGO <span className="text-danger">ETH</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    {message ? (
                      <p className="mb-4 text-light">{message}</p>
                    ) : (
                      <div className="loader-div">
                        <Loader type="Bars" color="#16ceb9" height={50} width={50} />
                      </div>
                    )}
                    <a href={ROUTE_PATH.TRADE} className="btn btn-danger">
                      Go to Home
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

export default React.memo(VerifyEmailComponent);

import HeaderLayout from 'containers/components/layout/Header';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React, {useState} from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {ROUTE_PATH} from 'routers/helpers';
import './styled.css';

const PrivatePolicyComponent = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const cbOpenLogin = () => setOpenLogin(false);

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
                <h2>Private Policy</h2>
                <h4>1. General Provisions</h4>
                <span>Finimix is committed to protecting and respecting your privacy.</span>
                <span>
                  This Privacy Policy (along with terms of use) is the basis for collecting, protecting and using your
                  personal information. We define "Personal Information" as information that personally identifies you,
                  such as your name, address, email address, transaction, bank details, etc.
                </span>
                <span>
                  The Company will not disclose any personal data of existing and former Customers unless the Client
                  gives written consent in writing to such disclosure or unless such disclosure is required by law.
                  current to verify the Client's identity. Client information is only transferred to the Company
                  employee who processes the Client's Accounts. All such information will be stored by the Company on
                  physical and electronic storage media in accordance with applicable law requirements.
                </span>
                <span>
                  The Finimix will implement advanced data protection measures and procedures and update them from time
                  to time for the purpose of protecting the Client's personal information.
                </span>
                <br />
                <br />
                <h4>2. Security statement</h4>
                <span>
                  The client's account password and login ID are unique and the password is encrypted so that even
                  Finimix employees cannot know them. Therefore, we are unable to retrieve a client's password and must
                  provide the customer with a new password on their email address if the customer forgets his password.
                </span>
                <span>
                  It is the responsibility of the customer to maintain the login information and email address
                  associated with any personal device accessible to the customer. The Company will not be responsible
                  for any unauthorized use of the account without fault of the Company.
                </span>
                <br />
                <br />
                <h4>3. Cookie and devices</h4>
                <span>
                  Finimix commits not to store any personal data of the Customer on the CLOUD storage services. All
                  information is stored on the customer's machine
                </span>
                <span>Finimix does not share any of the customer's cloud storage related data with anyone.</span>
                <span>
                  The company only accesses a customer's cloud storage when the customer is active on it. Customers can
                  disconnect their hosting services at any time.
                </span>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </header>
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
              <a href={ROUTE_PATH.PRIVATE_POLICY} className="active">Private Policy</a>
            </div>
          </div>
        </footer>
      </Scrollbars>
    </LoadingProvider>
  );
};

export default React.memo(PrivatePolicyComponent);

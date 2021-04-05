import ContainerLayout from 'containers/components/layout/Container';
import Pagination from 'containers/components/pagination';
import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import './styled.css';

const WalletComponent = () => {
  return (
    <ContainerLayout headerTitle="Wallet">
      <>
        <div className="row">
          <div className="col-md-12 text-center action-img">
            <div className="action-bottom">
              <button type="button" className="btn btn-primary">
                DEPOSIT
              </button>
              <button type="button" className="btn btn-warning mx-3">
                TRANSFER
              </button>
              <button type="button" className="btn btn-success">
                WITHDRAW
              </button>
            </div>
          </div>
        </div>
        <div className="block">
          <div className="row">
            <div className="col-lg-12">
              <Tabs defaultActiveKey="deposit_history">
                <Tab eventKey="deposit_history" title="Deposit History">
                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>Action</th>
                          <th>Open</th>
                          <th>Close</th>
                          <th>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                          <td>@mdo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Pagination page={1} perPage={20} count={3000} pageChange={(page: number) => {}} />
                </Tab>
                <Tab eventKey="tranfer_history" title="Tranfer History">
                  <div>222333</div>
                </Tab>
                <Tab eventKey="withdraw_history" title="Withdraw History">
                  <div>222333</div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </>
    </ContainerLayout>
  );
};

export default React.memo(WalletComponent);

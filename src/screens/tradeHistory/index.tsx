import ContainerLayout from 'containers/components/layout/Container';
import Pagination from 'containers/components/pagination';
import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styled.css';

const TradeHistoryComponent = () => {
  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12">
          <div className="block mb-0">
            <div className="title">
              <div className="d-flex">
                <div className="input-group" style={{width: '250px'}}>
                  <div style={{display: 'flex', lineHeight: 1.5, padding: '.4rem .75rem'}}>From</div>
                  <DatePicker selected={new Date()} className="form-control w-120" onChange={() => {}} />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="input-group" style={{width: '250px'}}>
                  <div style={{display: 'flex', lineHeight: 1.5, padding: '.4rem .75rem'}}>To</div>
                  <DatePicker selected={new Date()} className="form-control w-120" onChange={() => {}} />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="col-xs-12 col-md-3">
                  <button type="submit" className="btn btn-danger">
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-light">Time</th>
                    <th className="text-light">Type</th>
                    <th className="text-light">Action</th>
                    <th className="text-light">Open</th>
                    <th className="text-light">Close</th>
                    <th className="text-light">Result</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{moment().format('MM/DD/YYYY HH:mm')}</td>
                    <td>ETH/USDT</td>
                    <td>
                      <div className="d-inline-block mr-5 text-info text-bold">
                        <div className="d-inline-block mr-3">Buy</div>
                        <div className="d-inline-block">100</div>
                      </div>
                      <div className="d-inline-block text-danger text-bold">
                        <div className="d-inline-block mr-3">Sell</div>
                        <div className="d-inline-block">200</div>
                      </div>
                    </td>
                    <td>2141.17</td>
                    <td>2141.07</td>
                    <td>
                      <div className="d-inline-block text-info text-bold">
                        <div className="d-inline-block mr-2">WIN</div>
                        <div className="d-inline-block">+95</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>{moment().format('MM/DD/YYYY HH:mm')}</td>
                    <td>ETH/USDT</td>
                    <td>
                      <div className="d-inline-block mr-5 text-info text-bold">
                        <div className="d-inline-block mr-3">Buy</div>
                        <div className="d-inline-block">100</div>
                      </div>
                      <div className="d-inline-block text-danger text-bold">
                        <div className="d-inline-block mr-3">Sell</div>
                        <div className="d-inline-block">200</div>
                      </div>
                    </td>
                    <td>2140.17</td>
                    <td>2141.07</td>
                    <td>
                      <div className="d-inline-block text-danger text-bold">
                        <div className="d-inline-block mr-2">LOSS</div>
                        <div className="d-inline-block">-95</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination page={1} perPage={20} count={3000} pageChange={(page: number) => {}} />
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradeHistoryComponent);

import ContainerLayout from 'containers/components/layout/Container';
import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {TradeHistory} from 'models/tradeHistory';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {getTradeHistory} from './services';
import './styled.css';
interface FilterSearch {
  from: Date;
  to: Date;
}
export interface PaginateResult<T> {
  docs: Array<T>;
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
  offset?: number;
}
const TradeHistoryComponent = () => {
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [filterSearch, setFilterSearch] = useState<FilterSearch>({
    from: new Date(),
    to: new Date(),
  });
  const [pageActive, setPageActive] = useState<number>(1);
  const [history, setHistory] = useState<PaginateResult<TradeHistory>>({
    docs: [],
    limit: 3,
  });

  useEffect(() => {
    _fetchTradeHistory(pageActive);
  }, [pageActive]);

  const _onChangeDate = (type: 'from' | 'to', value) => {
    setFilterSearch({...filterSearch, [type]: value});
  };

  const _pageChange = (page: number) => setPageActive(page);
  const _search = async (page: number) => {
    if (page == pageActive) {
      await _fetchTradeHistory(page);
    }
    setPageActive(page);
  };

  const _fetchTradeHistory = async (page: number) => {
    try {
      showLoading();
      const result = await getTradeHistory({...filterSearch, page, limit: history.limit});
      setHistory(result.data);
    } catch (err) {
      addError(err, 'Load trade history fail!');
    } finally {
      hideLoading();
    }
  };

  const _renderHistory = () => {
    if (history?.docs.length === 0) return <div>No data</div>;
    return history.docs.map((d) => (
      <tr>
        <td>{d.order_uuid && moment(parseInt(d.order_uuid)).format('MM/DD/YYYY HH:mm')}</td>
        <td>ETH/USDT</td>
        <td>
          <div className="d-inline-block mr-5 text-info text-bold">
            <div className="d-inline-block mr-3">Buy</div>
            <div className="d-inline-block">{d.buy_amount_order}</div>
          </div>
          <div className="d-inline-block text-danger text-bold">
            <div className="d-inline-block mr-3">Sell</div>
            <div className="d-inline-block">{d.sell_amount_order}</div>
          </div>
        </td>
        <td>{d.open_result}</td>
        <td>{d.close_result}</td>
        <td>
          <div
            className={
              d.amount_result > 0 ? 'text-info d-inline-block text-bold' : 'text-danger d-inline-block text-bold'
            }>
            <div className="d-inline-block mr-2">{d.amount_result > 0 ? 'WIN' : 'LOSS'}</div>
            <div className="d-inline-block">{d.amount_result > 0 ? `+${d.amount_result}` : `${d.amount_result}`}</div>
          </div>
        </td>
      </tr>
    ));
  };
  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12">
          <div className="block mb-0">
            <div className="title">
              <div className="d-flex">
                <div className="input-group" style={{width: '250px'}}>
                  <div style={{display: 'flex', lineHeight: 1.5, padding: '.4rem .75rem'}}>From</div>
                  <DatePicker
                    maxDate={filterSearch.to}
                    selected={filterSearch.from}
                    className="form-control w-120"
                    onChange={(date) => _onChangeDate('from', date)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="input-group" style={{width: '250px'}}>
                  <div style={{display: 'flex', lineHeight: 1.5, padding: '.4rem .75rem'}}>To</div>
                  <DatePicker
                    minDate={filterSearch.from}
                    selected={filterSearch.to}
                    className="form-control w-120"
                    onChange={(date) => _onChangeDate('to', date)}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="col-xs-12 col-md-3">
                  <button className="btn btn-danger" onClick={() => _search(1)}>
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
                <tbody>{_renderHistory()}</tbody>
              </table>
            </div>
            <Pagination
              page={pageActive}
              perPage={history.limit ?? 50}
              count={history.total ?? -1}
              pageChange={(page: number) => _pageChange(page)}
            />
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradeHistoryComponent);

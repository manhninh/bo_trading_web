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
    limit: 50,
  });

  useEffect(() => {
    _fetchTradeHistory(pageActive);
  }, [pageActive]);

  const _onChangeDate = (type: 'from' | 'to') => (value: Date) => {
    setFilterSearch({...filterSearch, [type]: value});
  };

  const _pageChange = (page: number) => setPageActive(page);

  const _search = (page: number) => async () => {
    await _fetchTradeHistory(page);
  };

  const _fetchTradeHistory = async (page: number) => {
    showLoading();
    try {
      const result = await getTradeHistory({...filterSearch, page, limit: history.limit});
      setHistory(result.data);
    } catch (err) {
      addError(err, 'Load trade history fail!');
    } finally {
      hideLoading();
    }
  };

  const _renderHistory = () => {
    const html: JSX.Element[] = new Array();
    if (history?.docs.length === 0)
      html.push(
        <tr>
          <td colSpan={6} className="text-center">
            No data
          </td>
        </tr>,
      );
    else {
      history.docs.map((d, index) =>
        html.push(
          <tr key={`history_tr_${index}`}>
            <td>{d.order_uuid && moment(parseInt(d.order_uuid)).format('MM/DD/YYYY HH:mm')}</td>
            <td>ETH/USDT</td>
            <td>
              <div className="d-inline-block text-info text-bold">
                <div className="d-inline-block w-40">Buy</div>
                <div className="d-inline-block w-80">{d.buy_amount_order}</div>
              </div>
              <div className="d-inline-block text-danger text-bold">
                <div className="d-inline-block w-40">Sell</div>
                <div className="d-inline-block w-80">{d.sell_amount_order}</div>
              </div>
            </td>
            <td>{d.open_result}</td>
            <td>{d.close_result}</td>
            <td>
              <div className={`${d.amount_result > 0 ? 'text-info' : 'text-danger'} d-inline-block text-bold`}>
                <div className="d-inline-block w-70">{d.amount_result > 0 ? 'WIN' : 'LOSS'}</div>
                <div className="d-inline-block">
                  {d.amount_result > 0 ? `+${d.amount_result}` : `${d.amount_result}`}
                </div>
              </div>
            </td>
          </tr>,
        ),
      );
    }
    return html;
  };

  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12">
          <div className="block px-0 mb-0">
            <div className="title mb-1">
              <div className="d-flex">
                <div className="input-group input-group-sm datePicker-group">
                  <div className="datePicker-text">From</div>
                  <DatePicker
                    maxDate={filterSearch.to}
                    minDate={moment(filterSearch.to).subtract('3', 'months').toDate()}
                    selected={filterSearch.from}
                    className="form-control datePicker-input"
                    onChange={_onChangeDate('from')}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <div className="input-group input-group-sm datePicker-group">
                  <div className="datePicker-text">To</div>
                  <DatePicker
                    minDate={filterSearch.from}
                    maxDate={moment(filterSearch.from).add('3', 'months').toDate()}
                    selected={filterSearch.to}
                    className="form-control datePicker-input"
                    onChange={_onChangeDate('to')}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt" />
                    </span>
                  </div>
                </div>
                <button className="btn btn-sm btn-danger" onClick={_search(1)}>
                  Search
                </button>
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

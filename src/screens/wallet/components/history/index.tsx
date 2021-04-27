import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {TransationHistory} from 'models/wallet';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {fetchTransactionHistory, TYPE_HISTORY} from 'screens/wallet/services';
import {FilterSearch, IProps, Props} from './propState';

interface PaginateResult<T> {
  docs: Array<T>;
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}

const HistoryTableComponent = (props: IProps = Props) => {
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [filterSearch, setFilterSearch] = useState<FilterSearch>({
    from: new Date(),
    to: new Date(),
  });
  const [pageActive, setPageActive] = useState<number>(1);
  const [history, setHistory] = useState<PaginateResult<TransationHistory>>({
    docs: [],
    total: -1,
    limit: 50,
  });

  useEffect(() => {
    if (props.requestRefesh === props.tabActive) {
      // const today = new Date();
      // const _filterSearch = {from: today, to: today};
      // setFilterSearch(_filterSearch);
      _getTransactionHistory(TYPE_HISTORY[props.tabActive], 1);
    }
  }, [props.requestRefesh]);

  useEffect(() => {
    _getTransactionHistory(TYPE_HISTORY[props.tabActive], pageActive);
  }, [pageActive]);

  const _getTransactionHistory = async (
    type: TYPE_HISTORY,
    page: number,
    limit?: number,
    _filterSearch?: FilterSearch,
  ) => {
    try {
      showLoading();
      limit = limit || history.limit;
      _filterSearch = _filterSearch || filterSearch;
      const res = await fetchTransactionHistory({..._filterSearch, page, limit, type});
      setHistory(res.data);
    } catch (err) {
      addError(err, 'Load transaction history fail!');
    } finally {
      hideLoading();
    }
  };

  const _onChangeDate = (type: 'from' | 'to') => (value: Date) => {
    setFilterSearch({...filterSearch, [type]: value});
  };

  const _pageChange = (page: number) => {
    setPageActive(page);
  };

  const _search = async () => {
    await _getTransactionHistory(TYPE_HISTORY[props.tabActive], 1);
  };

  const _renderRows = () => {
    if (history?.docs.length === 0)
      return (
        <tr>
          <td colSpan={6} className="text-center">
            No data
          </td>
        </tr>
      );
    return history?.docs.map((d, i) => (
      <tr key={`${props.tabActive}-history-${i}`}>
        <th scope="row">{i}</th>
        <td>{moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
        {props.tabActive === 'TRANSFER' && <td>{d.from_username}</td>}
        {props.tabActive === 'TRANSFER' && <td>{d.to_username}</td>}
        <td>{d.amount}</td>
        {props.tabActive !== 'TRANSFER' && <td>{d.symbol}</td>}
        {props.tabActive === 'WITHDRAW' && <td>{d.address ?? ''}</td>}
        {props.tabActive !== 'TRANSFER' && <td>{d.status}</td>}
      </tr>
    ));
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="input-group" style={{width: '250px'}}>
          <div style={{display: 'flex', lineHeight: 1.5, padding: '.4rem .75rem'}}>From</div>
          <DatePicker
            maxDate={filterSearch.to}
            minDate={moment(filterSearch.to).subtract('3', 'months').toDate()}
            selected={filterSearch.from}
            className="form-control w-120"
            onChange={_onChangeDate('from')}
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
            maxDate={moment(filterSearch.from).add('3', 'months').toDate()}
            selected={filterSearch.to}
            className="form-control w-120"
            onChange={_onChangeDate('to')}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt" />
            </span>
          </div>
        </div>
        <div className="col-xs-12 col-md-3">
          <button type="submit" className="btn btn-danger" onClick={_search}>
            Search
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-light">No.</th>
              <th className="text-light">Date</th>
              {props.tabActive === 'TRANSFER' && <th className="text-light">From</th>}
              {props.tabActive === 'TRANSFER' && <th className="text-light">To</th>}
              <th className="text-light">Amount</th>
              {props.tabActive !== 'TRANSFER' && <th className="text-light">Symbol</th>}
              {props.tabActive === 'WITHDRAW' && <th className="text-light">Address</th>}
              {props.tabActive !== 'TRANSFER' && <th className="text-light">Status</th>}
            </tr>
          </thead>
          <tbody>{_renderRows()}</tbody>
        </table>
      </div>
      <Pagination
        page={pageActive}
        perPage={history.limit ?? 50}
        count={history.total ?? -1}
        pageChange={(page: number) => _pageChange(page)}
      />
    </>
  );
};

export default React.memo(HistoryTableComponent);

import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  getCommissionsCopyTrade,
  getCommissionsMemberList,
  getCommissionsTradeDetail,
  getCommissionsWithdrawHistories,
} from 'screens/commissions/services';
import {number2DecimalPlaces} from 'utils/formatter';
import {FilterSearch, IProps, NameRoutes, Props} from './propState';

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
  const [history, setHistory] = useState<PaginateResult<any>>({
    docs: [],
    total: -1,
    limit: 50,
  });

  useEffect(() => {
    if (props.requestRefesh === props.tabActive) {
      const today = new Date();
      const _filterSearch = {from: today, to: today};
      setFilterSearch(_filterSearch);
      getHistory(1, 50, _filterSearch);
    }
  }, [props.requestRefesh]);

  useEffect(() => {
    getHistory(pageActive);
  }, [pageActive]);

  const getHistory = async (page: number, limit?: number, _filterSearch?: FilterSearch) => {
    try {
      showLoading();
      limit = limit || history.limit;
      _filterSearch = _filterSearch || filterSearch;
      let result;
      switch (props.tabActive) {
        case NameRoutes.TRADING:
          result = await getCommissionsTradeDetail({
            fromDate: _filterSearch.from,
            toDate: _filterSearch.to,
            page,
            limit,
          });
          break;
        case NameRoutes.COPY_TRADE:
          result = await getCommissionsCopyTrade({
            fromDate: _filterSearch.from,
            toDate: _filterSearch.to,
            page,
            limit,
          });
          break;
        case NameRoutes.HISTORY_WITHDRAW:
          result = await getCommissionsWithdrawHistories({
            fromDate: _filterSearch.from,
            toDate: _filterSearch.to,
            page,
            limit,
          });
          break;
        case NameRoutes.MEMBER_LIST:
          result = await getCommissionsMemberList({
            fromDate: _filterSearch.from,
            toDate: _filterSearch.to,
            page,
            limit,
          });
          break;
      }

      setHistory(result.data);
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
    await getHistory(1);
  };

  const _renderHeaders = () => {
    return props.renderTable.headers.map((h) => <th className="text-light">{h}</th>);
  };

  const _renderValues = (data) => {
    const list_td: any = [];
    props.renderTable.props.map((p, index) => {
      if (p === 'investment_amount' || p === 'commission' || p === 'amount') {
        list_td.push(
          <td key={index}>
            <div className="d-inline-block">
              <div className="d-inline-block w-40">{number2DecimalPlaces(data[p])}</div>
              <div className="d-inline-block w-80">USDF</div>
            </div>
          </td>,
        );
      } else if (p === 'type_commission') {
        list_td.push(<td>{data[p] ? 'Commission Trade' : 'Commission Copy Trade'}</td>);
      } else if (p === 'agency') {
        list_td.push(<td>{data[p] ? 'Active' : 'Deactived'}</td>);
      } else {
        list_td.push(<td>{data[p]}</td>);
      }
    });
    return list_td;
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
        <td scope="row">{i}</td>
        <td>{d.createdAt && moment(d.createdAt).format('MM/DD/YYYY HH:mm')}</td>
        {_renderValues(d)}
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
              <th className="text-light">Time</th>
              {_renderHeaders()}
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
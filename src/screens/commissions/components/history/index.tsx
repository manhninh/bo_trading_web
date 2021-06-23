import SpinnerLoader from 'containers/components/loader';
import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import {
  getCommissionsCopyTrade,
  getCommissionsMemberList,
  getCommissionsTradeDetail,
  getCommissionsWithdrawHistories
} from 'screens/commissions/services';
import { number2DecimalPlaces } from 'utils/formatter';
import { FilterSearch, IProps, NameRoutes, Props } from './propState';

interface PaginateResult<T> {
  docs: Array<T>;
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}

const HistoryTableComponent = (props: IProps = Props) => {
  const { t } = useTranslation();
  // const {showLoading, hideLoading} = useLoading();
  const { addError } = useError();
  const [filterSearch, setFilterSearch] = useState<FilterSearch>({
    from: new Date(moment().subtract(3, 'months').toString()),
    to: new Date(),
  });
  const [pageActive, setPageActive] = useState<number>(1);
  const [loading, showLoading] = useState(false);
  const [history, setHistory] = useState({
    docs: new Array(),
    total: -1,
    limit: 10,
  });

  useEffect(() => {
    // if (props.requestRefesh === props.tabActive) {
    getHistory(1);
    // }
  }, [props.requestRefesh]);

  const getHistory = async (page: number, limit?: number, _filterSearch?: FilterSearch) => {
    showLoading(true);
    try {
      limit = limit || history.limit;
      _filterSearch = _filterSearch || filterSearch;
      let result;
      switch (props.tabActive) {
        case NameRoutes.TRADING:
          result = await getCommissionsTradeDetail({
            fromDate: new Date(_filterSearch.from).toISOString(),
            toDate: new Date(_filterSearch.to).toISOString(),
            page,
            limit,
          });
          break;
        case NameRoutes.COPY_TRADE:
          result = await getCommissionsCopyTrade({
            fromDate: new Date(_filterSearch.from).toISOString(),
            toDate: new Date(_filterSearch.to).toISOString(),
            page,
            limit,
          });
          break;
        case NameRoutes.HISTORY_WITHDRAW:
          result = await getCommissionsWithdrawHistories({
            fromDate: new Date(_filterSearch.from).toISOString(),
            toDate: new Date(_filterSearch.to).toISOString(),
            page,
            limit,
          });
          break;
        case NameRoutes.MEMBER_LIST:
          result = await getCommissionsMemberList({
            fromDate: new Date(_filterSearch.from).toISOString(),
            toDate: new Date(_filterSearch.to).toISOString(),
            page,
            limit,
          });
          break;
      }
      setHistory({
        docs: result.data.docs,
        total: result.data.total,
        limit: result.data.limit,
      });
    } catch (err) {
      addError(err, 'Load transaction history fail!');
    } finally {
      showLoading(false);
    }
  };

  const _onChangeDate = (type: 'from' | 'to') => (value: Date) => {
    setFilterSearch({ ...filterSearch, [type]: value });
  };

  const _pageChange = (page: number) => {
    setPageActive(page);
    getHistory(page);
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
              <div className="d-inline-block">{number2DecimalPlaces(data[p])} $</div>
            </div>
          </td>,
        );
      } else if (p === 'type_commission') {
        list_td.push(<td>{!data[p] ? 'Commission Trade' : 'Commission Copy Trade'}</td>);
      } else if (p === 'agency') {
        list_td.push(<td>{data[p] ? 'Active' : 'Deactived'}</td>);
      } else if (p === 'is_withdraw') {
        list_td.push(<td>{data[p] ? 'Yes' : 'No'}</td>);
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
          <td colSpan={props.renderTable.headers.length + 2} className="text-center">
            {t('common:commission.nodata')}
          </td>
        </tr>
      );
    return history?.docs.map((d, i) => (
      <tr key={`${props.tabActive}-history-${i}`}>
        <td scope="row">{(pageActive - 1) * 10 + i + 1}</td>
        <td>{d.createdAt && moment(d.createdAt).format('MM/DD/YYYY HH:mm')}</td>
        {_renderValues(d)}
      </tr>
    ));
  };

  return loading ? (
    <SpinnerLoader />
  ) : (
    <>
      <div className="d-flex justify-content-end mt-3 from-to">
        <div className="date-group">
          <div className="input-group input-group-sm datePicker-group">
            <div className="datePicker-text">{t('common:commission.from')}</div>
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
            <div className="datePicker-text">{t('common:commission.to')}</div>
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
        </div>
        <button type="submit" className="btn btn-sm btn-danger" onClick={_search}>
          {t('common:commission.search')}
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-light">No.</th>
              <th className="text-light">{t('common:commission.date')}</th>
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

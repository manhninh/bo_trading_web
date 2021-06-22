import { useAppSelector } from 'boot/configureStore';
import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import { useLoading } from 'containers/hooks/loadingProvider/userLoading';
import { capitalize } from 'lodash';
import { TransationHistory } from 'models/wallet';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { fetchTransactionHistory, TYPE_HISTORY } from 'screens/wallet/services';
import { TRANSACTION_STATUS } from 'screens/wallet/transfer/propState';
import { FilterSearch, IProps, Props } from './propState';

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
  const { showLoading, hideLoading } = useLoading();
  const { addError } = useError();
  const user_id = useAppSelector((state) => state.authState.accountInfor._id);
  const [filterSearch, setFilterSearch] = useState<FilterSearch>({
    from: new Date(moment().subtract(3, "months").toString()),
    to: new Date(),
  });
  const [pageActive, setPageActive] = useState<number>(1);
  const [history, setHistory] = useState<PaginateResult<TransationHistory>>({
    docs: [],
    total: -1,
    limit: 10,
  });

  useEffect(() => {
    if (props.requestRefesh?.toUpperCase() === props.tabActive) {
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
      const res = await fetchTransactionHistory({
        from: _filterSearch.from.toISOString(),
        to: _filterSearch.to.toISOString(),
        page,
        limit,
        type,
      });
      setHistory(res.data);
    } catch (err) {
      addError(err, 'Load transaction history fail!');
    } finally {
      hideLoading();
    }
  };

  const _onChangeDate = (type: 'from' | 'to') => (value: Date) => {
    setFilterSearch({ ...filterSearch, [type]: value });
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
            {t('common:wallet.nodata')}
          </td>
        </tr>
      );
    return history?.docs.map((d, i) => (
      <tr key={`${props.tabActive}-history-${i}`}>
        <th scope="row">{i + 1}</th>
        <td>{moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
        {props.tabActive === 'TRANSFER' && (
          <td>
            {d.user_id !== user_id
              ? d.from_username
              : d.from_wallet
                ? `Wallet ${d.from_wallet}`.toUpperCase()
                : d.from_username}
          </td>
        )}
        {props.tabActive === 'TRANSFER' && (
          <td>{d.to_wallet ? `Wallet ${d.to_wallet}`.toUpperCase() : d.to_username}</td>
        )}
        <td>{d.amount}</td>
        {props.tabActive !== 'TRANSFER' && <td>{d.symbol}</td>}
        {props.tabActive === 'WITHDRAW' && <td>{d.address ?? ''}</td>}
        {props.tabActive !== 'TRANSFER' && <td>{capitalize(TRANSACTION_STATUS[d.status])}</td>}
      </tr>
    ));
  };

  return (
    <>
      <div className="d-flex justify-content-end mt-3 from-to">
        <div className="date-group">
          <div className="input-group input-group-sm datePicker-group">
            <div className="datePicker-text">{t('common:wallet.from')}</div>
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
            <div className="datePicker-text">{t('common:wallet.to')}</div>
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
          {t('common:wallet.search')}
        </button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-light">No.</th>
              <th className="text-light">{t('common:wallet.date')}</th>
              {props.tabActive === 'TRANSFER' && <th className="text-light">{t('common:wallet.from')}</th>}
              {props.tabActive === 'TRANSFER' && <th className="text-light">{t('common:wallet.to')}</th>}
              <th className="text-light">{t('common:wallet.amount')}</th>
              {props.tabActive !== 'TRANSFER' && <th className="text-light">{t('common:wallet.symbol')}</th>}
              {props.tabActive === 'WITHDRAW' && <th className="text-light">{t('common:wallet.address')}</th>}
              {props.tabActive !== 'TRANSFER' && <th className="text-light">{t('common:wallet.status')}</th>}
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

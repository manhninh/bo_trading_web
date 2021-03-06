import {useAppSelector} from 'boot/configureStore';
import ContainerLayout from 'containers/components/layout/Container';
import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {TradeHistory} from 'models/tradeHistory';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {useTranslation} from 'react-i18next';
import {formatter2} from 'utils/formatter';
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
  const {t} = useTranslation();
  const accountInfor = useAppSelector((state) => state.authState.accountInfor);
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  // const [filterSearch, setFilterSearch] = useState<FilterSearch>({
  //   from: new Date(moment().subtract(3, "months").toString()),
  //   to: new Date(),
  // });
  // const [pageActive, setPageActive] = useState<number>(1);
  const [history, setHistory] = useState<PaginateResult<TradeHistory>>({
    docs: [],
    limit: 10,
  });

  useEffect(() => {
    _fetchTradeHistory(1);
  }, [accountInfor.type_user]);

  // const _onChangeDate = (type: 'from' | 'to') => (value: Date) => {
  //   setFilterSearch({ ...filterSearch, [type]: value });
  // };

  // const _pageChange = (page: number) => setPageActive(page);

  // const _search = (page: number) => async () => {
  //   await _fetchTradeHistory(page);
  // };

  const _fetchTradeHistory = async (page: number) => {
    showLoading();
    try {
      const result = await getTradeHistory(page.toString(), accountInfor.type_user.toString());
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
            {t('common:history.nodata')}
          </td>
        </tr>,
      );
    else {
      history.docs.map((d, index) =>
        html.push(
          <tr key={`history_tr_${index}`}>
            <td className="text-center">{d.order_uuid && moment(parseInt(d.order_uuid)).format('MM/DD/YYYY HH:mm')}</td>
            <td className="text-right text-info align-middle">{formatter2.format(d.buy_amount_order)}</td>
            <td className="text-right text-danger align-middle">{formatter2.format(d.sell_amount_order)}</td>
            <td className="text-right align-middle">{formatter2.format(d.open_result)}</td>
            <td className="text-right align-middle">{formatter2.format(d.close_result)}</td>
            <td className="text-center align-middle">
              <div className={`d-flex justify-content-center ${d.amount_result > 0 ? 'text-info' : 'text-danger'}`}>
                <div className="d-inline-block">{d.amount_result > 0 ? 'WIN' : 'LOSS'}</div>
                <div className="d-inline-block text-right w-9vh">
                  {d.amount_result > 0 ? `+${d.amount_result}` : `${d.amount_result}`} $
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
          <div className="block p-0 mb-0">
            {/* <div className="title mb-1">
              <div className="d-flex justify-content-end from-to">
                <div className="date-group">
                  <div className="input-group input-group-sm datePicker-group">
                    <div className="datePicker-text">{t('common:history.from')}</div>
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
                    <div className="datePicker-text">{t('common:history.to')}</div>
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
                <button className="btn btn-sm btn-danger" onClick={_search(1)}>
                  {t('common:history.search')}
                </button>
              </div>
            </div> */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="text-light text-center">{t('common:history.date')}</th>
                    <th className="text-light text-right">{t('common:history.buy')}</th>
                    <th className="text-light text-right">{t('common:history.sell')}</th>
                    {/* <th className="text-light text-center" colSpan={2}>
                      {t('common:history.action')}
                    </th> */}
                    <th className="text-light text-right">{t('common:history.open')}</th>
                    <th className="text-light text-right">{t('common:history.close')}</th>
                    <th className="text-light text-center">{t('common:history.result')}</th>
                  </tr>
                </thead>
                <tbody>{_renderHistory()}</tbody>
              </table>
            </div>
            {/* <Pagination
              page={pageActive}
              perPage={history.limit ?? 50}
              count={history.total ?? -1}
              pageChange={(page: number) => _pageChange(page)}
            /> */}
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradeHistoryComponent);

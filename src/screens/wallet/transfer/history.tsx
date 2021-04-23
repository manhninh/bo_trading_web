import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {fetchTransactionHistory, TYPE_HISTORY} from '../services';
import './styled.css';

interface PaginateResult<T> {
  docs: Array<T>;
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}

const HistoryComponent = () => {
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();

  const [pageActive, setPageActive] = useState<number>(1);
  const [history, setHistory] = useState<PaginateResult<any>>({
    docs: [],
    total: -1,
    limit: 50,
  });
  const [tabActive, setTabActive] = useState(TYPE_HISTORY[TYPE_HISTORY.DEPOSIT]);

  useEffect(() => {
    _getTransactionHistory(TYPE_HISTORY[tabActive], pageActive);
  }, [tabActive, pageActive]);

  const _getTransactionHistory = async (type: TYPE_HISTORY, page: number, limit?: number) => {
    try {
      showLoading();
      const res = await fetchTransactionHistory(type, page, limit);
      setHistory(res.data);
    } catch (err) {
      addError(err, 'Load transaction history fail!');
    } finally {
      hideLoading();
    }
  };

  const _pageChange = (page: number) => {
    setPageActive(page);
  };

  const _onSelectTab = (active: string | null) => {
    active && setTabActive(active);
    setPageActive(1);
  };

  const _renderRows = () => {
    if (history?.docs.length === 0) return <div>No data</div>;
    return history?.docs.map((d, i) => (
      <tr>
        <th scope="row">{i}</th>
        <td>{moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
        {tabActive === 'TRANFER' && <td>From</td>}
        {tabActive === 'TRANFER' && <td>To</td>}
        <td>{d.amount}</td>
        {tabActive !== 'TRANFER' && <td>{d.symbol}</td>}
        {tabActive === 'WITHRAW' && <td>{d.address ?? ''}</td>}
        {tabActive !== 'TRANFER' && <td>{d.status}</td>}
      </tr>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="text-light">No.</th>
            <th className="text-light">Date</th>
            {tabActive === 'TRANFER' && <th className="text-light">From</th>}
            {tabActive === 'TRANFER' && <th className="text-light">To</th>}
            <th className="text-light">Amount</th>
            {tabActive !== 'TRANFER' && <th className="text-light">Symbol</th>}
            {tabActive === 'WITHRAW' && <th className="text-light">Address</th>}
            {tabActive !== 'TRANFER' && <th className="text-light">Status</th>}
          </tr>
        </thead>
        <tbody>{_renderRows()}</tbody>
      </table>
    </div>
  );
};

export default React.memo(HistoryComponent);

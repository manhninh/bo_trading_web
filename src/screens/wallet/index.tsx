import ContainerLayout from 'containers/components/layout/Container';
import Pagination from 'containers/components/pagination';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import DepositComponent from './deposit';
import {fetchTransactionHistory, TYPE_HISTORY} from './services';
import './styled.css';
import TranferComponent from './transfer';
import WithdrawComponent from './withdraw';
interface PaginateResult<T> {
  docs: Array<T>;
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}

const WalletComponent = () => {
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
    console.log('active_tab', tabActive);
    console.log('page_number', pageActive);
    _getTransactionHistory(TYPE_HISTORY[tabActive], pageActive);
  }, [tabActive, pageActive]);

  const _getTransactionHistory = async (type: TYPE_HISTORY, page: number, limit?: number) => {
    try {
      showLoading();
      const res = await fetchTransactionHistory(type, page, limit);
      console.log(res);
      setHistory(res.data);
    } catch (err) {
      console.log(err);
      // addError(err);
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

  const _renderTab = () => {
    return (
      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              {tabActive === 'TRANFER' && <th>From</th>}
              {tabActive === 'TRANFER' && <th>To</th>}
              <th>Amount</th>
              {tabActive !== 'TRANFER' && <th>Symbol</th>}
              {tabActive === 'WITHRAW' && <th>Address</th>}
              {tabActive !== 'TRANFER' && <th>Status</th>}
            </tr>
          </thead>
          <tbody>{_renderRows()}</tbody>
        </table>
      </div>
    );
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
    <ContainerLayout headerTitle="Wallet">
      <>
        <div className="row">
          <div className="text-center action-img">
            <div className="action-bottom">
              <DepositComponent />
              <TranferComponent />
              <WithdrawComponent />
            </div>
          </div>
          <div className="block right-body">
            <div className="row">
              <div className="col-lg-12">
                <Tabs defaultActiveKey={tabActive} onSelect={_onSelectTab}>
                  <Tab eventKey={TYPE_HISTORY[TYPE_HISTORY.DEPOSIT]} title="Deposit History">
                    {_renderTab()}
                  </Tab>
                  <Tab eventKey={TYPE_HISTORY[TYPE_HISTORY.TRANFER]} title="Tranfer History">
                    {_renderTab()}
                  </Tab>
                  <Tab eventKey={TYPE_HISTORY[TYPE_HISTORY.WITHRAW]} title="Withdraw History">
                    {_renderTab()}
                  </Tab>
                </Tabs>
                <Pagination
                  page={pageActive}
                  perPage={history.limit}
                  count={100}
                  pageChange={(page: number) => _pageChange(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    </ContainerLayout>
  );
};

export default React.memo(WalletComponent);

import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {cloneDeep, startCase} from 'lodash';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Modal, Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {Redirect, Route, useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import CommissionCopyTrade from './commissionCopyTrade';
import CommissionTrade from './commissionTrade';
import {Commission} from './propState';
import {commissionWithdraw, getCommissions} from './services';
import './styled.css';

const components = {
  trading: lazy(() => import('./trading')),
  // copy_trade: lazy(() => import('./copytrade')),
  history_withdraw: lazy(() => import('./historyWithdraw')),
  member_list: lazy(() => import('./memberList')),
};

const CommissionComponent = () => {
  const {pathname} = useLocation();
  const {showLoading, hideLoading} = useLoading();
  const {addError} = useError();
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [state, setState] = useState({
    show: false,
    typeCommissionWidthPopup: null,
    withdraw: 0,
    requestRefesh: null,
  });
  useEffect(() => {
    (async () => {
      const result = await getCommissions();
      if (result?.data) {
        setCommissions(result.data);
      }
    })();
  }, []);

  const getCommissionByType = (type) => {
    return commissions.find((c) => c.type_commission === type);
  };

  const onRequestRefesh = (tabActive) => {
    setState({...state, requestRefesh: tabActive});
  };

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/commissions/${route}`} active={pathname === `/commissions/${route}`}>
          {startCase(route.split('_').join(' '))}
        </Nav.Link>
      </NavItem>
    ));

  const renderRoutes = () =>
    Object.entries(components).map(([route, Component]) => (
      <Route key={`${route}-route`} path={`/commissions/${route}`}>
        <Tab.Pane active={pathname === `/commissions/${route}`}>
          <Component requestRefesh={state.requestRefesh} />
        </Tab.Pane>
      </Route>
    ));

  const handleShow = (type, withdraw) => {
    if (withdraw > 0) setState((state) => ({...state, show: true, typeCommissionWidthPopup: type, withdraw}));
  };

  const handleClose = () => setState((state) => ({...state, show: false, typeCommissionWidthPopup: null, withdraw: 0}));

  const confirmWithdraw = async () => {
    try {
      showLoading();
      const result = await commissionWithdraw(state.typeCommissionWidthPopup);
      if (result) {
        const path: any = pathname.substring(pathname.lastIndexOf('/') + 1);
        const index = commissions.findIndex((c) => c.type_commission === state.typeCommissionWidthPopup);
        const newCommissions = cloneDeep(commissions);
        newCommissions[index].commission = 0;
        setCommissions(newCommissions);
        setState({...state, show: false, typeCommissionWidthPopup: null, withdraw: 0, requestRefesh: path});
      }
    } catch (err) {
      addError(err, 'Update commmission withdraw fail!');
    } finally {
      hideLoading();
    }
  };

  return (
    <ContainerLayout>
      <>
        <div className="row">
          <div className="offset-lg-4 col-lg-4">
            <CommissionTrade commission={getCommissionByType(0)} openPopup={handleShow} />
          </div>
          {/* <div className="col-lg-3">
            <CommissionCopyTrade commission={getCommissionByType(1)} openPopup={handleShow} />
          </div> */}
        </div>
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container>
              <Nav fill={true} justify={true} variant="tabs">
                {renderNavItems()}
              </Nav>
              <TabContent>
                <Suspense fallback={<SpinnerLoader />}>
                  <Switch>
                    <Redirect from="/" to="/commissions/trading" />
                    {renderRoutes()}
                  </Switch>
                </Suspense>
              </TabContent>
            </Tab.Container>
          </div>
        </div>
        <Modal centered={true} show={state.show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Body>
            <p className="text-light">
              Would you like to withdraw <span className="text-danger text-bold">{state.withdraw} USDF</span> to your
              spot wallet?
            </p>
            <div className="text-right">
              <button type="submit" className="btn btn-sm btn-info mr-2" onClick={confirmWithdraw}>
                Yes
              </button>
              <button type="submit" className="btn btn-sm btn-danger" onClick={handleClose}>
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </ContainerLayout>
  );
};

export default React.memo(CommissionComponent);

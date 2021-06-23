import ContainerLayout from 'containers/components/layout/Container';
import SpinnerLoader from 'containers/components/loader';
import useError from 'containers/hooks/errorProvider/useError';
import {useLoading} from 'containers/hooks/loadingProvider/userLoading';
import {cloneDeep} from 'lodash';
import React, {lazy, Suspense, useEffect, useState} from 'react';
import {Modal, Nav, NavItem, Tab, TabContent} from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import {useTranslation} from 'react-i18next';
import {Redirect, Route, useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import CommissionTrade from './commissionTrade';
import {Commission} from './propState';
import {commissionWithdraw, getCommissions} from './services';
import './styled.css';

const CommissionComponent = () => {
  const {t} = useTranslation();
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

  const components = {
    [t('common:commission.trading')]: lazy(() => import('./trading')),
    // copy_trade: lazy(() => import('./copytrade')),
    [t('common:commission.withdrawHistory')]: lazy(() => import('./historyWithdraw')),
    [t('common:commission.memberList')]: lazy(() => import('./memberList')),
  };

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

  const renderNavItems = () =>
    Object.keys(components).map((route) => (
      <NavItem key={`${route}-nav-item`}>
        <Nav.Link as={NavLink} to={`/commissions/${route}`} active={pathname === `/commissions/${route}`}>
          {t(`common:commission.${route}`)}
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
                    <Redirect from="/" to="/commissions/trading_history" />
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
              {t('common:commission.title1')} <span className="text-danger text-bold">{state.withdraw} $</span>{' '}
              {t('common:commission.title2')}
            </p>
            <div className="text-right">
              <button type="submit" className="btn btn-sm btn-info mr-2" onClick={confirmWithdraw}>
                {t('common:commission.yes')}
              </button>
              <button type="submit" className="btn btn-sm btn-danger" onClick={handleClose}>
                {t('common:commission.no')}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </ContainerLayout>
  );
};

export default React.memo(CommissionComponent);

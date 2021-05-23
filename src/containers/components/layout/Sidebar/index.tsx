import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATH } from 'routers/helpers';
import './styled.css';

const SidebarLayout = () => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const _toogleSwitch = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      {isMobile ?
        <button className="sidebar-toggle" onClick={_toogleSwitch}>
          <i className="fas fa-align-justify"></i>
        </button> : null}
      <div className={`sidebar-container ${!isMobile ? "" : (showMenu ? "" : 'd-none')}`}>
        <nav id="sidebar" className="shrinked">
          <ul className="list-unstyled">
            <li>
              <NavLink to={ROUTE_PATH.TRADE}>
                <i className="icomoon-icon-trading"></i>{t('common:sidebar.trading')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.COPY_TRADE}>
                <i className="icomoon-icon-copy_trade"></i>{t('common:sidebar.copy_trade')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.WALLET}>
                <i className="icomoon-icon-wallet"></i>{t('common:sidebar.wallet')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.TRADE_HISTORY}>
                <i className="icomoon-icon-history"></i>{t('common:sidebar.history')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.AFFILIATE_LINK}>
                <i className="icomoon-icon-affiliate_link"></i>{t('common:sidebar.affiliate_link')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.COMISSIONS}>
                <i className="icomoon-icon-commission"></i>{t('common:sidebar.commissions')}
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTE_PATH.SETTINGS}>
                <i className="icomoon-icon-settings"></i>{t('common:sidebar.settings')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default React.memo(SidebarLayout);

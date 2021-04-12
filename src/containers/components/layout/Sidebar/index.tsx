import React from 'react';
import {NavLink} from 'react-router-dom';
import {ROUTE_PATH} from 'routers/helpers';
import './styled.css';

const SidebarLayout = () => {
  return (
    <nav id="sidebar" className="shrinked">
      <ul className="list-unstyled">
        <li>
          <NavLink to={ROUTE_PATH.TRADE}>
            <i className="icomoon-icon-trading"></i>Trading
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.COPY_TRADE}>
            <i className="icomoon-icon-copy_trade"></i>Copy Trade
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.WALLET}>
            <i className="icomoon-icon-wallet"></i>Wallet
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.TRADE_HISTORY}>
            <i className="icomoon-icon-history"></i>History
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.COMISSIONS}>
            <i className="icomoon-icon-commission"></i>Commissions
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.AFFILIATE_LINK}>
            <i className="icomoon-icon-affiliate_link"></i>Affiliate link
          </NavLink>
        </li>
        <li>
          <NavLink to={ROUTE_PATH.SETTINGS}>
            <i className="icomoon-icon-settings"></i>Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(SidebarLayout);

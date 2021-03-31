import React from 'react';
import {NavLink} from 'react-router-dom';
import './styled.css';

const SidebarLayout = () => {
  return (
    <nav id="sidebar" className="shrinked">
      <ul className="list-unstyled">
        <li className="active">
          <NavLink to="/">
            <i className="icomoon-icon-trading"></i>Trading
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-copy_trade"></i>Copy Trade
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-wallet"></i>Wallet
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-history"></i>History
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-commission"></i>Commissions
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-settings"></i>Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-affiliate_link"></i>Affiliate link
          </NavLink>
        </li>
        <li>
          <NavLink to="/">
            <i className="icomoon-icon-logout"></i>Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(SidebarLayout);

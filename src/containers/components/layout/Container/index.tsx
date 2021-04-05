import {ReactComponent as BackgroundSvg} from 'assets/images/back_map_world.svg';
import HeaderLayout from 'containers/components/layout/Header';
import SidebarLayout from 'containers/components/layout/Sidebar';
import React from 'react';
import {Props} from './propState';
import './styled.css';

const ContainerLayout = (props: Props) => {
  return (
    <>
      <HeaderLayout />
      <div className="sidebar-container">
        <SidebarLayout />
      </div>
      <div className="page-content">
        {props.headerTitle && (
          <div className="page-header">
            <div className="container-fluid">
              <h2 className="h5 no-margin-bottom">{props.headerTitle}</h2>
            </div>
          </div>
        )}
        <section>
          <div className="container-fluid">
            <div className="backgroundSvg">{props.backgroundSvg || <BackgroundSvg />}</div>
            {props.children}
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(ContainerLayout);

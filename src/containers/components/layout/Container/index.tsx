import { ReactComponent as BackgroundSvg } from 'assets/images/back_map_world.svg';
import HeaderLayout from 'containers/components/layout/Header';
import SidebarLayout from 'containers/components/layout/Sidebar';
import { LoadingProvider } from 'containers/hooks/loadingProvider';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Props } from './propState';
import './styled.css';
const height = window.innerHeight - 148;

const ContainerLayout = (props: Props) => {
  return (
    <LoadingProvider>
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
          <Scrollbars autoHide={true} style={{ height }}>
            <div className="container-fluid">
              <div className="backgroundSvg">{props.backgroundSvg || <BackgroundSvg />}</div>
              {props.children}
            </div>
          </Scrollbars>
        </section>
      </div>
    </LoadingProvider>
  );
};

export default React.memo(ContainerLayout);

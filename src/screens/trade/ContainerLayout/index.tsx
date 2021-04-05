import {ReactComponent as BackgroundSvg} from 'assets/images/back_map_world.svg';
import HeaderLayout from 'containers/components/layout/Header';
import SidebarLayout from 'containers/components/layout/Sidebar';
import React from 'react';
import RightLayout from '../RightLayout';
import {Props} from './propState';
import './styled.css';

const ContainerLayout = (props: Props) => {
  return (
    <>
      <HeaderLayout />
      <div className="sidebar-container">
        <SidebarLayout />
      </div>
      <div className="page-content page-content-custom">
        <section>
          <div className="container-fluid">
            <div className="backgroundSvg">
              <BackgroundSvg />
            </div>
            {props.children}
          </div>
        </section>
      </div>
      <div className="right-container">
        <RightLayout />
      </div>
    </>
  );
};

export default React.memo(ContainerLayout);

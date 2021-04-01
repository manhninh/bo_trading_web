import { ReactComponent as BackgroundSvg } from 'assets/images/back_map_world.svg';
import HeaderLayout from 'containers/components/layout/Header';
import SidebarLayout from 'containers/components/layout/Sidebar';
import React from 'react';
import { Props } from './propState';
import './styled.css';

const ContainerLayout = (props: Props) => {
  return (
    <>
      <HeaderLayout />
      <div className="d-flex align-items-stretch">
        <SidebarLayout />
        <div className="page-content active">
          <section>
            <div style={{ position: "fixed", top: 0, left: 0 }}><BackgroundSvg /></div>
            <div className="container-fluid">
              {props.children}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default React.memo(ContainerLayout);

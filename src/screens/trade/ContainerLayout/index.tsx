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
      <div className="d-flex align-items-stretch">
        <SidebarLayout />
        <div className="page-content active">
          <section>
            <div className="container-fluid">
              <div style={{position: 'fixed'}}>
                <BackgroundSvg />
              </div>
              {props.children}
            </div>
          </section>
        </div>
        <RightLayout />
      </div>
    </>
  );
};

export default React.memo(ContainerLayout);

import HeaderLayout from 'containers/components/layout/Header';
import SidebarLayout from 'containers/components/layout/Sidebar';
import React from 'react';
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
              <div className="row"></div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default React.memo(ContainerLayout);

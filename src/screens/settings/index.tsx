import ContainerLayout from 'containers/components/layout/Container';
import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import ProflieSettingComponent from './profile';
import SecurityComponent from './security';
import './styled.css';

const SettingComponent = () => {
  return (
    <ContainerLayout headerTitle="Settings">
      <div className="block">
        <div className="row">
          <div className="col-lg-12">
            <Tabs defaultActiveKey="profile">
              <Tab eventKey="profile" title="Profile">
                <ProflieSettingComponent />
              </Tab>
              <Tab eventKey="security" title="Security">
                <SecurityComponent />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(SettingComponent);

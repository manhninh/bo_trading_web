import {ReactComponent as ChevronRightSvg} from 'assets/images/ChevronRight.svg';
import {ReactComponent as LogoSvg} from 'assets/images/logo.svg';
import {ReactComponent as NotificationSvg} from 'assets/images/notification.svg';
import {ReactComponent as SupportSvg} from 'assets/images/support.svg';
import {ReactComponent as UserSvg} from 'assets/images/user.svg';
import React from 'react';
import {Col, Dropdown, Row} from 'react-bootstrap';
import {DepositStyled, DepositTextStyled, LinkStyled, LinkTextStyled, LogoStyled, TypeUserTextStyled} from './styles';

const CustomToggle = React.forwardRef((props: any, ref: any) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      props.onClick(e);
    }}>
    {props.children}
    <div style={{marginLeft: 40, display: 'inline-block', position: 'relative', bottom: 15}}>
      <ChevronRightSvg />
    </div>
  </a>
));

const HeaderLayout = () => {
  return (
    <Row>
      <Col xs={4} md={4}>
        <LogoStyled>
          <LogoSvg />
        </LogoStyled>
      </Col>
      <Col xs={8} md={8}>
        <Row className="float-right">
          <Dropdown style={{background: '#49505A', borderRadius: '0px 0px 10px 10px', padding: '0 16px 10px'}}>
            <Dropdown.Toggle as={CustomToggle}>
              <div style={{display: 'inline-block'}}>
                <TypeUserTextStyled>Demo account</TypeUserTextStyled>
                <TypeUserTextStyled>$ 10.000.000</TypeUserTextStyled>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <DepositStyled type="button">
            <DepositTextStyled>DEPOSIT</DepositTextStyled>
          </DepositStyled>

          <LinkStyled href="#">
            <div>
              <UserSvg />
            </div>
            <LinkTextStyled>manhninh91</LinkTextStyled>
          </LinkStyled>
          <LinkStyled href="#">
            <div>
              <NotificationSvg />
            </div>
            <LinkTextStyled>Notification</LinkTextStyled>
          </LinkStyled>
          <LinkStyled href="#">
            <div>
              <SupportSvg />
            </div>
            <LinkTextStyled>Support</LinkTextStyled>
          </LinkStyled>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(HeaderLayout);

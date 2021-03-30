import {Button, Row} from 'react-bootstrap';
import styled from 'styled-components';

export const LogoStyled = styled(Row)`
  padding: 10px 0 0 17px;
`;

export const LinkStyled = styled.a`
  margin-top: 15px;
  display: inline-block;
  text-align: center;
  color: #ffffff;
  padding: 0 20px;
`;

export const LinkTextStyled = styled.span`
  font-family: Roboto-Regular;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #ffffff;
`;

export const DepositStyled = styled(Button)`
  background: #16ceb9 !important;
  border-radius: 10px !important;
  border-color: #16ceb9 !important;
  padding: 15px 58px;
  margin: 10px 63px 0 15px;
`;

export const DepositTextStyled = styled.div`
  font-family: Roboto-Bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;
`;

export const TypeUserTextStyled = styled.div`
  font-family: Roboto-Medium;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-top: 10px;
`;

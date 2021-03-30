import React from 'react';
import Header from '../Header';
import {Props} from './propState';
import {ContainerStyled} from './styles';

const ContainerLayout = (props: Props) => {
  return (
    <ContainerStyled fluid>
      <Header />
      {props.children}
    </ContainerStyled>
  );
};

export default React.memo(ContainerLayout);

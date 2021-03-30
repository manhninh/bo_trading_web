import React from 'react';
import { ContainerStyled } from './styles';

const ContainerComponent = () => {
  return <ContainerStyled fluid>
  </ContainerStyled>;
};

export default React.memo(ContainerComponent);

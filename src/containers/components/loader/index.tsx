import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled from 'styled-components';

const SpinnerLoader = (props: any) => (
  <FallbackContainer>
    <Loader type="Bars" color="#16ceb9" height={80} width={80} />
  </FallbackContainer>
);

export default React.memo(SpinnerLoader);

const FallbackContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

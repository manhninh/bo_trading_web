import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled from 'styled-components';

const SpinnerLoader = () => (
  <FallbackContainer>
    <FallbackContent>
      <Loader type="Bars" color="#16ceb9" height={80} width={80} />
    </FallbackContent>
  </FallbackContainer>
);

export default React.memo(SpinnerLoader);

const FallbackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;

const FallbackContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

import React from 'react';
import {useDispatch} from 'react-redux';
import NavigationComponent from 'routers';

const RootComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <NavigationComponent />
    </>
  );
};

export default React.memo(RootComponent);

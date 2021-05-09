import React, {useEffect, useState} from 'react';
import {Transition, TransitionStatus} from 'react-transition-group';
import {ROUTE_PATH} from 'routers/helpers';
import RegisterComponent from '../conponent';
import {Props, State} from './propState';
import './styled.css';

const duration = 200;

const RegisterPopup = (props: Props) => {
  const [state, setState] = useState<State>({
    isOpen: false,
  });

  useEffect(() => {
    setState((state) => ({...state, isOpen: props.isOpen}));
  }, [props.isOpen]);

  const toogleForm = () => {
    setState((state) => ({...state, isOpen: !state.isOpen}));
    props.callbackToogle();
  };

  const sidebarTransitionStyles = {
    entering: {width: 0},
    entered: {width: '400px'},
    exiting: {width: '400px'},
    exited: {width: 0},
  };

  return (
    <Transition in={state.isOpen} timeout={duration}>
      {(state: TransitionStatus) => (
        <div className={state == 'entered' || state == 'exiting' ? 'form-opacity' : ''}>
          <div
            className="form-container"
            style={{
              transition: `width ${duration}ms ease-in-out`,
              ...sidebarTransitionStyles[state],
            }}>
            <div className="p-40">
              <div className="d-flex justify-content-between">
                <div className="brand-big">
                  <img src={process.env.PUBLIC_URL + '/logo512.png'} />
                </div>
                <button type="button" className="btn btn-outline-secondary" onClick={toogleForm}>
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="text-left my-5">
                <h2 className="text-light">Create Finimix account</h2>
              </div>
              <RegisterComponent />
              <p className="text-center">
                <p className="text-muted text-center">
                  Already have an account? <a href={ROUTE_PATH.LOGIN}>Login</a>.
                </p>
              </p>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default React.memo(RegisterPopup);

import React, { useEffect, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import LogInComponent from '../component';
import { Props, State } from './propState';
import './styled.css';

const duration = 200;

const LogInPopupComponent = (props: Props) => {
  const [state, setState] = useState<State>({
    username: '',
    password: '',
    isOpen: false,
  });

  useEffect(() => {
    setState((state) => ({ ...state, isOpen: props.isOpen }));
  }, [props.isOpen]);

  const toogleForm = () => {
    setState((state) => ({ ...state, isOpen: !state.isOpen }));
    props.callbackToogle();
  };

  const sidebarTransitionStyles = {
    entering: { width: 0 },
    entered: { width: '400px' },
    exiting: { width: '400px' },
    exited: { width: 0 },
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
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-outline-secondary" onClick={toogleForm}>
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-gray-light mb-5">Login</h1>
              </div>
              <LogInComponent />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default React.memo(LogInPopupComponent);

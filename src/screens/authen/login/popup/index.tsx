import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { Transition, TransitionStatus } from 'react-transition-group';
import LogInComponent from '../component';
import { Props, State } from './propState';
import './styled.css';

const duration = 200;

const LogInPopupComponent = (props: Props) => {
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const { t } = useTranslation();
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
    entered: { width: isDesktopOrLaptop ? '400px' : "100%", height: "100vh", overflow: "auto" },
    exiting: { width: isDesktopOrLaptop ? '400px' : "100%", height: "100vh", overflow: "auto" },
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
              <div className="d-flex justify-content-between">
                <div className="brand-big">
                  <img src={process.env.PUBLIC_URL + '/logo512.png'} />
                </div>
                <button type="button" className="btn btn-outline-secondary" onClick={toogleForm}>
                  <i className="fas fa-times" />
                </button>
              </div>
              <div className="text-left my-5">
                <h2 className="text-light">{t('common:authen.loginTitle')}</h2>
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

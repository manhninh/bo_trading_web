import {useAppSelector} from 'boot/configureStore';
import React from 'react';
import {buildStyles, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styled.css';

const CountDownTimer = () => {
  const timeTick = useAppSelector((state) => state.tradeState.timeTick);
  console.log(timeTick, 'timeTick');

  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        <CircularProgressbarWithChildren
          value={timeTick}
          minValue={0}
          maxValue={29}
          background={true}
          backgroundPadding={5}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: 30 - timeTick > 10 ? '#16ceb9' : '#F04B4B',
            trailColor: '#FFFFFF',
            backgroundColor: 'rgb(73, 80, 90)',
            pathTransition: timeTick === 0 ? 'none' : 'stroke-dashoffset 0.5s ease 0s',
          })}>
          <div className="timer">
            <div className="value" style={{color: 30 - timeTick > 10 ? '#16ceb9' : '#F04B4B'}}>
              {30 - timeTick}
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

export default React.memo(CountDownTimer);

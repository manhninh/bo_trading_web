import React from "react";
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./styled.css";

const CountDownTimer = () => {
  const percentage = 20;
  return (
    <div className="timer-wrapper">
      <div className="timer-container">
        <CircularProgressbarWithChildren
          value={percentage}
          minValue={0}
          maxValue={30}
          background={true}
          backgroundPadding={5}
          styles={buildStyles({ pathColor: `#16ceb9`, trailColor: '#FFFFFF', backgroundColor: 'rgb(73, 80, 90)', })}
        >
          <div className="timer">
            <div className="value">30</div>
            <div className="text">seconds</div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div >
  );
};

export default React.memo(CountDownTimer);
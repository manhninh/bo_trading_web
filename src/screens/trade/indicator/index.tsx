import React from 'react';
import ReactSpeedometer, {CustomSegmentLabelPosition, Transition} from 'react-d3-speedometer';
import './styled.css';

const IndicatorComponent = () => {
  return (
    <div className="row">
      <div className="col-5">
        <div className="public-user-block py-2" style={{borderBottom: '1px solid #34373d'}}>
          <div className="row">
            <div className="col-5 px-0">
              <div className="order text-light">Indicator</div>
            </div>
            <div className="col-7 px-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <i className="fas fa-caret-up text-success" />
                  <strong>Buy</strong>
                </div>
                <div className="item text-warning">
                  <i className="fab fa-gg text-warning" />
                  <strong>Neutral</strong>
                </div>
                <div className="item text-danger">
                  <i className="fas fa-caret-down text-danger" />
                  <strong>Sell</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block py-2">
          <div className="row">
            <div className="col-5 px-0">
              <div className="order text-info">Oscillators</div>
            </div>
            <div className="col-7 px-0">
              <div className="details d-flex">
                <div className="item">
                  <strong>110</strong>
                </div>
                <div className="item">
                  <strong>200</strong>
                </div>
                <div className="item">
                  <strong>100</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block py-2">
          <div className="row">
            <div className="col-5 px-0">
              <div className="order text-info">Moving Averages</div>
            </div>
            <div className="col-7 px-0">
              <div className="details d-flex">
                <div className="item">
                  <strong>110</strong>
                </div>
                <div className="item">
                  <strong>200</strong>
                </div>
                <div className="item">
                  <strong>100</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block py-2">
          <div className="row">
            <div className="col-5 px-0">
              <div className="order text-info">MACD Histogram</div>
            </div>
            <div className="col-7 px-0">
              <div className="details d-flex">
                <div className="item">
                  <strong>110</strong>
                </div>
                <div className="item">
                  <strong>200</strong>
                </div>
                <div className="item">
                  <strong>100</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block" style={{borderTop: '1px solid #34373d'}}>
          <div className="row">
            <div className="col-7 offset-5 px-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <strong>330</strong>
                </div>
                <div className="item text-warning">
                  <strong>600</strong>
                </div>
                <div className="item text-danger">
                  <strong>300</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-4">
        <ReactSpeedometer
          height={189}
          segments={3}
          ringWidth={47}
          needleHeightRatio={0.7}
          segmentColors={['#28a745', '#ffc107', '#F04B4B']}
          currentValueText="Indicator"
          customSegmentLabels={[
            {
              text: 'BUY',
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
            {
              text: 'Neutral',
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
            {
              text: 'SELL',
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
          ]}
          needleTransitionDuration={3333}
          needleTransition={Transition.easeElastic}
          needleColor="#16CEB9"
          textColor="#FFFFFF"
          value={600}
          customSegmentStops={[0, 380, 620, 1000]}
        />
      </div>
      <div className="col-3">
        <div className="py-2 text-danger text-left" style={{marginTop: '3rem'}}>
          <div className="title text-center" style={{display: 'inline-block', verticalAlign: 'middle'}}>
            <h2>Signal Sell</h2>
            <h2>65%</h2>
          </div>
          <i
            className="fas fa-arrow-alt-circle-down"
            style={{fontSize: 50, marginLeft: '1.5rem', display: 'inline-block', verticalAlign: 'middle'}}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndicatorComponent);

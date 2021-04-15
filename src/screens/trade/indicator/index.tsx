import React, { useContext, useEffect, useState } from 'react';
import ReactSpeedometer, { CustomSegmentLabelPosition, Transition } from 'react-d3-speedometer';
import SocketContext, { ContextType } from '../socketContext/context';
import './styled.css';

const IndicatorComponent = () => {
  const { indicator } = useContext<ContextType>(SocketContext);
  const [signal, setSignal] = useState({ type: '', color: '#8a8d93', icon: '', });

  useEffect(() => {
    if (indicator.indicator_type > 0 && indicator.indicator_type < 380)
      setSignal({ type: 'Buy', color: '#28a745', icon: 'fas fa-caret-up' });
    else if (indicator.indicator_type > 380 && indicator.indicator_type < 620)
      setSignal({ type: 'Neutral', color: '#ffc107', icon: '' });
    else if (indicator.indicator_type > 620 && indicator.indicator_type < 1000)
      setSignal({ type: 'Sell', color: '#F04B4B', icon: 'fas fa-caret-down' });
    else setSignal({ type: '', color: '#8a8d93', icon: '' });
  }, [indicator.indicator_type]);

  console.log("3");

  return (
    <div className="row">
      <div className="col-5 px-0">
        <div className="public-user-block py-2" style={{ borderBottom: '1px solid #34373d' }}>
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
                  <strong>{indicator.oscillatorsBuy}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.oscillatorsNeutral}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.oscillatorsSell}</strong>
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
                  <strong>{indicator.maBuy}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.maNeutral}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.maSell}</strong>
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
                  <strong>{indicator.macdBuy}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.macdNeutral}</strong>
                </div>
                <div className="item">
                  <strong>{indicator.macdSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block" style={{ borderTop: '1px solid #34373d' }}>
          <div className="row">
            <div className="col-7 offset-5 px-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <strong>{indicator.totalBuy}</strong>
                </div>
                <div className="item text-warning">
                  <strong>{indicator.totalNeutral}</strong>
                </div>
                <div className="item text-danger">
                  <strong>{indicator.totalSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-4 px-0">
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
          value={indicator.indicator_type}
          customSegmentStops={[0, 380, 620, 1000]}
        />
      </div>
      <div className="col-3 px-0">
        <div className="py-2 text-left" style={{ color: signal.color, marginTop: '3rem' }}>
          <div className="title text-center" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <h2>Signal {signal.type}</h2>
            <h2>{indicator.indicator} %</h2>
          </div>
          {signal.icon && (
            <i
              className={signal.icon}
              style={{
                color: signal.color,
                fontSize: 80,
                marginLeft: '1.5rem',
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndicatorComponent);

import { RootState, useAppSelector } from 'boot/configureStore';
import _ from "lodash";
import React, { useEffect, useMemo, useState } from 'react';
import ReactSpeedometer, { CustomSegmentLabelPosition, Transition } from 'react-d3-speedometer';
import { createSelector } from 'reselect';
import { Indicator } from '../redux/state';
import './styled.css';

const width = (window.innerWidth - 600) / 3;

const IndicatorComponent = () => {
  // user type
  const makeSelectorIndicator = () => createSelector(
    (state: RootState) => state.tradeState.indicator,
    (_: any, props: Indicator) => props,
    (indicator, props) => _.isEqual(indicator, props) ? indicator : props
  );
  const selectorIndicator = useMemo(makeSelectorIndicator, []);
  const indicator = useAppSelector(state => selectorIndicator(state, {
    oscillatorsBuy: 0,
    oscillatorsNeutral: 0,
    oscillatorsSell: 0,
    maBuy: 0,
    maNeutral: 0,
    maSell: 0,
    macdBuy: 0,
    macdNeutral: 0,
    macdSell: 0,
    totalBuy: 0,
    totalNeutral: 0,
    totalSell: 0,
    indicator_type: 0,
    indicator: 0,
  }));

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

  console.log("IndicatorComponent");

  return (
    <div className="row m-0">
      <div className="col-5 mt-3">
        <div className="public-user-block" style={{ borderBottom: '1px solid #34373d' }}>
          <div className="row">
            <div className="col-5 pr-0">
              <div className="order text-light fontcustom">Indicator</div>
            </div>
            <div className="col-7 p-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <i className="fas fa-caret-up text-success" />
                  <strong className="fontcustom">Buy</strong>
                </div>
                <div className="item text-warning">
                  <i className="fab fa-gg text-warning" />
                  <strong className="fontcustom">Neutral</strong>
                </div>
                <div className="item text-danger">
                  <i className="fas fa-caret-down text-danger" />
                  <strong className="fontcustom">Sell</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block">
          <div className="row">
            <div className="col-5 pr-0">
              <div className="order text-info fontcustom">Oscillators</div>
            </div>
            <div className="col-7 p-0">
              <div className="details d-flex">
                <div className="item">
                  <strong className="fontcustom">{indicator.oscillatorsBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.oscillatorsNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.oscillatorsSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block">
          <div className="row">
            <div className="col-5 pr-0">
              <div className="order text-info fontcustom">Moving Averages</div>
            </div>
            <div className="col-7 p-0">
              <div className="details d-flex">
                <div className="item">
                  <strong className="fontcustom">{indicator.maBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.maNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.maSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block">
          <div className="row">
            <div className="col-5 pr-0">
              <div className="order text-info fontcustom">MACD Histogram</div>
            </div>
            <div className="col-7 p-0">
              <div className="details d-flex">
                <div className="item">
                  <strong className="fontcustom">{indicator.macdBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.macdNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator.macdSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block" style={{ borderTop: '1px solid #34373d' }}>
          <div className="row">
            <div className="col-7 offset-5 p-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <strong className="fontcustom">{indicator.totalBuy}</strong>
                </div>
                <div className="item text-warning">
                  <strong className="fontcustom">{indicator.totalNeutral}</strong>
                </div>
                <div className="item text-danger">
                  <strong className="fontcustom">{indicator.totalSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-4 p-0">
        <ReactSpeedometer
          width={width}
          segments={3}
          ringWidth={40}
          needleHeightRatio={0.5}
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
      <div className="col-3 p-0 mt-3">
        <div className="py-2 text-left" style={{ color: signal.color }}>
          <div className="title text-center d-inline-block">
            <h3>Signal {signal.type}</h3>
            <h3>{indicator.indicator} %</h3>
          </div>
          {signal.icon && (
            <span className="icon-indicator">
              <i
                className={signal.icon}
                style={{ color: signal.color }}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndicatorComponent);

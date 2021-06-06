import {RootState, useAppSelector} from 'boot/configureStore';
import _ from 'lodash';
import React, {useMemo} from 'react';
import ReactSpeedometer, {CustomSegmentLabelPosition, Transition} from 'react-d3-speedometer';
import {useTranslation} from 'react-i18next';
import {createSelector} from 'reselect';
import './styled.css';

const IndicatorComponent = () => {
  const {t} = useTranslation();
  const makeSelectorIndicator = () =>
    createSelector(
      (state: RootState) => state.tradeState.indicator,
      (_: any, props: null) => props,
      (indicator, props) => {
        if (!_.isEqual(indicator, props)) {
          let signal: {type: string; color: string; icon: string} = {type: '', color: '#8a8d93', icon: ''};
          // if (indicator.indicator_type > 0 && indicator.indicator_type < 380)
          signal = {type: 'Buy', color: '#28a745', icon: 'fas fa-caret-up'};
          // else if (indicator.indicator_type > 380 && indicator.indicator_type < 620)
          //   signal = {type: 'Neutral', color: '#ffc107', icon: ''};
          // else if (indicator.indicator_type > 620 && indicator.indicator_type < 1000)
          //   signal = {type: 'Sell', color: '#F04B4B', icon: 'fas fa-caret-down'};
          return {
            ...indicator,
            signal,
          };
        }
        return null;
      },
    );
  const selectorIndicator = useMemo(makeSelectorIndicator, []);
  const indicator = useAppSelector((state) => selectorIndicator(state, null));

  return (
    <div className="row justify-content-center m-0">
      <div className="mt-3" style={{width: '350px'}}>
        <div className="public-user-block" style={{borderBottom: '1px solid #34373d'}}>
          <div className="row">
            <div className="col-5 pr-0">
              <div className="order text-light fontcustom">{t('common:trade.indicator')}</div>
            </div>
            <div className="col-7 p-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <i className="fas fa-caret-up text-success m-l-10" />
                  <strong className="fontcustom">{t('common:trade.buy')}</strong>
                </div>
                <div className="item text-warning">
                  <i className="fab fa-gg text-warning" />
                  <strong className="fontcustom">{t('common:trade.neutral')}</strong>
                </div>
                <div className="item text-danger">
                  <i className="fas fa-caret-down text-danger" />
                  <strong className="fontcustom">{t('common:trade.sell')}</strong>
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
                  <strong className="fontcustom">{indicator?.oscillatorsBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.oscillatorsNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.oscillatorsSell}</strong>
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
                  <strong className="fontcustom">{indicator?.maBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.maNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.maSell}</strong>
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
                  <strong className="fontcustom">{indicator?.macdBuy}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.macdNeutral}</strong>
                </div>
                <div className="item">
                  <strong className="fontcustom">{indicator?.macdSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="public-user-block" style={{borderTop: '1px solid #34373d'}}>
          <div className="row">
            <div className="col-7 offset-5 p-0">
              <div className="details d-flex">
                <div className="item text-success">
                  <strong className="fontcustom">{indicator?.totalBuy}</strong>
                </div>
                <div className="item text-warning">
                  <strong className="fontcustom">{indicator?.totalNeutral}</strong>
                </div>
                <div className="item text-danger">
                  <strong className="fontcustom">{indicator?.totalSell}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-0 pl-4" style={{width: '260px'}}>
        <ReactSpeedometer
          width={260}
          segments={3}
          ringWidth={40}
          needleHeightRatio={0.5}
          segmentColors={['#28a745', '#ffc107', '#F04B4B']}
          currentValueText={t('common:trade.indicator')}
          customSegmentLabels={[
            {
              text: t('common:trade.buy'),
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
            {
              text: t('common:trade.neutral'),
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
            {
              text: t('common:trade.sell'),
              position: CustomSegmentLabelPosition.Inside,
              color: '#FFFFFF',
            },
          ]}
          needleTransitionDuration={3333}
          needleTransition={Transition.easeElastic}
          needleColor="#16CEB9"
          textColor="#FFFFFF"
          value={indicator?.indicator_type}
          customSegmentStops={[0, 380, 620, 1000]}
        />
      </div>
      <div className="p-0 mt-3" style={{width: '150px'}}>
        <div className="py-2 text-right" style={{color: indicator?.signal.color}}>
          <div className="title text-center d-block">
            <h4>
              {t('common:trade.signal')} {indicator?.signal.type}
            </h4>
            <h4>{indicator?.indicator} %</h4>
          </div>
          {indicator?.signal.icon && (
            <span className="icon-indicator">
              <i className={indicator?.signal.icon} style={{color: indicator?.signal.color}} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(IndicatorComponent);

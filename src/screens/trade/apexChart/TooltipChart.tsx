import React from 'react';
import { useTranslation } from 'react-i18next';

const OHLCTooltip = (props: any) => {
  const {t} = useTranslation();
  return (
    <g className="react-stockcharts-tooltip-hover">
      <text fontFamily="Muli,sans-serif" fontSize="14" x="0" y="0" className="react-stockcharts-tooltip">
        <tspan x="8.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="8.5rem" dy="0rem" opacity="0.5">
          {t('common:trade.open')}
          </tspan>
          <tspan fill="#FFFFFF" x="8.5rem" dy="1.5rem" fontSize="16">
            {props.open}
          </tspan>
        </tspan>
        <tspan x="13.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="13.5rem" dy="0rem" opacity="0.5">
          {t('common:trade.hight')}
          </tspan>
          <tspan fill="#FFFFFF" x="13.5rem" dy="1.5rem" fontSize="16">
            {props.high}
          </tspan>
        </tspan>
        <tspan x="18.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="18.5rem" dy="0rem" opacity="0.5">
          {t('common:trade.low')}
          </tspan>
          <tspan fill="#FFFFFF" x="18.5rem" dy="1.5rem" fontSize="16">
            {props.low}
          </tspan>
        </tspan>
        <tspan x="23.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="23.5rem" dy="0rem" opacity="0.5">
          {t('common:trade.close')}
          </tspan>
          <tspan fill="#FFFFFF" x="23.5rem" dy="1.5rem" fontSize="16">
            {props.close}
          </tspan>
        </tspan>
        <tspan x="28.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="28.5rem" dy="0rem" opacity="0.5">
          {t('common:trade.vol')}
          </tspan>
          <tspan fill="#FFFFFF" x="28.5rem" dy="1.5rem" fontSize="16">
            {props.volume}
          </tspan>
        </tspan>
      </text>
    </g>
  );
};

export default React.memo(OHLCTooltip);

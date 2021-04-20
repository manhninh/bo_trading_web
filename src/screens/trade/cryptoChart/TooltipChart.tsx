import React from 'react';

const OHLCTooltip = (props: any) => {
  return (
    <g className="react-stockcharts-tooltip-hover">
      <text fontFamily="Muli,sans-serif" fontSize="14" x="0" y="0" className="react-stockcharts-tooltip">
        <tspan x="8.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="8.5rem" dy="0rem" opacity="0.5">
            Open
          </tspan>
          <tspan fill="#FFFFFF" x="8.5rem" dy="1.5rem" fontSize="16">
            {props.open}
          </tspan>
        </tspan>
        <tspan x="13.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="13.5rem" dy="0rem" opacity="0.5">
            High
          </tspan>
          <tspan fill="#FFFFFF" x="13.5rem" dy="1.5rem" fontSize="16">
            {props.high}
          </tspan>
        </tspan>
        <tspan x="18.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="18.5rem" dy="0rem" opacity="0.5">
            Low
          </tspan>
          <tspan fill="#FFFFFF" x="18.5rem" dy="1.5rem" fontSize="16">
            {props.low}
          </tspan>
        </tspan>
        <tspan x="23.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="23.5rem" dy="0rem" opacity="0.5">
            Close
          </tspan>
          <tspan fill="#FFFFFF" x="23.5rem" dy="1.5rem" fontSize="16">
            {props.close}
          </tspan>
        </tspan>
        <tspan x="28.5rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="28.5rem" dy="0rem" opacity="0.5">
            Vol
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

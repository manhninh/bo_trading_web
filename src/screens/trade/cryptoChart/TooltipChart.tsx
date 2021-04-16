import React from 'react';

const OHLCTooltip = (props: any) => {
  return (
    <g className="react-stockcharts-tooltip-hover">
      <text fontFamily="Muli,sans-serif" fontSize="14" x="0" y="0" className="react-stockcharts-tooltip">
        <tspan x="10rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="10rem" dy="0rem" opacity="0.3">
            Open
          </tspan>
          <tspan fill="#FFFFFF" x="10rem" dy="1.5rem" fontSize="16">
            {props.open}
          </tspan>
        </tspan>
        <tspan x="15rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="15rem" dy="0rem" opacity="0.3">
            High
          </tspan>
          <tspan fill="#FFFFFF" x="15rem" dy="1.5rem" fontSize="16">
            {props.high}
          </tspan>
        </tspan>
        <tspan x="20rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="20rem" dy="0rem" opacity="0.3">
            Low
          </tspan>
          <tspan fill="#FFFFFF" x="20rem" dy="1.5rem" fontSize="16">
            {props.low}
          </tspan>
        </tspan>
        <tspan x="25rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="25rem" dy="0rem" opacity="0.3">
            Close
          </tspan>
          <tspan fill="#FFFFFF" x="25rem" dy="1.5rem" fontSize="16">
            {props.close}
          </tspan>
        </tspan>
        <tspan x="30rem" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#FFFFFF" x="30rem" dy="0rem" opacity="0.3">
            Vol
          </tspan>
          <tspan fill="#FFFFFF" x="30rem" dy="1.5rem" fontSize="16">
            {props.volume}
          </tspan>
        </tspan>
      </text>
    </g>
  );
};

export default React.memo(OHLCTooltip);

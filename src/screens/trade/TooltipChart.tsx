import React from 'react';

const OHLCTooltip = (props: any) => {
  return (
    <g className="react-stockcharts-tooltip-hover">
      <text fontFamily="Circular Std" fontSize="14" x="0" y="0" className="react-stockcharts-tooltip">
        <tspan x="11.4em" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#D8D8D8" x="11.4em" dy="1em" opacity="0.5">
            Open
          </tspan>
          <tspan fill="#D8D8D8" x="10em" dy="1.5em" fontSize="16">
            {props.open}
          </tspan>
        </tspan>
        <tspan x="17.5em" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#D8D8D8" x="17.5em" dy="1em" opacity="0.5">
            High
          </tspan>
          <tspan fill="#D8D8D8" x="15.4em" dy="1.5em" fontSize="16">
            {props.high}
          </tspan>
        </tspan>
        <tspan x="23.6em" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#D8D8D8" x="23.6em" dy="1em" opacity="0.5">
            Low
          </tspan>
          <tspan fill="#D8D8D8" x="20.8em" dy="1.5em" fontSize="16">
            {props.low}
          </tspan>
        </tspan>
        <tspan x="29.7em" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#D8D8D8" x="29.7em" dy="1em" opacity="0.5">
            Close
          </tspan>
          <tspan fill="#D8D8D8" x="26.2em" dy="1.5em" fontSize="16">
            {props.close}
          </tspan>
        </tspan>
        <tspan x="35.8em" y="0">
          <tspan className="react-stockcharts-tooltip-label" fill="#D8D8D8" x="35.8em" dy="1em" opacity="0.5">
            Vol
          </tspan>
          <tspan fill="#D8D8D8" x="31.6em" dy="1.5em" fontSize="16">
            {props.volume}
          </tspan>
        </tspan>
      </text>
    </g>
  );
};

export default React.memo(OHLCTooltip);

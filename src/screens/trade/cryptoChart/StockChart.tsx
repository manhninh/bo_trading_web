import {format} from 'd3-format';
import moment from 'moment';
import React from 'react';
import {isMobile} from 'react-device-detect';
import {Chart, ChartCanvas} from 'react-stockcharts';
import {XAxis, YAxis} from 'react-stockcharts/lib/axes';
import {
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  PriceCoordinate,
} from 'react-stockcharts/lib/coordinates';
import {fitWidth} from 'react-stockcharts/lib/helper';
import {tma} from 'react-stockcharts/lib/indicator';
import {discontinuousTimeScaleProvider} from 'react-stockcharts/lib/scale';
import {BarSeries, CandlestickSeries, LineSeries} from 'react-stockcharts/lib/series';
import {OHLCTooltip} from 'react-stockcharts/lib/tooltip';
import {random} from 'utils/formatter';
import MyOHLCTooltip from './TooltipChart';

const mouseEdgeAppearance = {
  textFill: '#FFFFFF',
  stroke: '#05233B',
  strokeOpacity: 1,
  strokeWidth: 3,
  arrowWidth: 5,
  fill: '#05233B',
};

interface IProps {
  data: [];
  width: number;
  ratio: number;
  height: number;
}

const CandleStickChartWithMACDIndicator = React.forwardRef((props: IProps, ref) => {
  const {data: initialData, ratio, width, height} = props;
  const tma10 = tma()
    .id(1)
    .options({windowSize: 12})
    .merge((d: any, c: any) => {
      d.tma10 = c;
    })
    .accessor((d: any) => d.tma10)
    .stroke('#F04B4B');

  const tma3 = tma()
    .id(2)
    .options({windowSize: 8})
    .merge((d: any, c: any) => {
      d.tma3 = c;
    })
    .accessor((d: any) => d.tma3)
    .stroke('#16CEB9');

  const calculatedData = tma3(tma10(initialData));

  initialData.map((data: any) => {
    data.date = new Date(data.event_time);
    return data;
  });
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d: any) => d.date);

  const {data, xScale, xAccessor, displayXAccessor} = xScaleProvider(calculatedData);

  const xExtents = [isMobile ? 50.3 : 20.3, data.length];

  const margin = {left: 0, right: 80, top: 35, bottom: 30};
  const yGrid = {innerTickSize: -1 * (width - margin.left - margin.right)};
  const closeLast = data[data.length - 1].close;
  const openLast = data[data.length - 1].open;

  return (
    <>
      <ChartCanvas
        ref={ref}
        width={width + 20}
        ratio={ratio}
        height={height}
        margin={margin}
        type="hybrid"
        seriesName="TRADING"
        data={data}
        xScale={xScale}
        xAccessor={xAccessor}
        displayXAccessor={displayXAccessor}
        xExtents={xExtents}
        panEvent={false}
        zoomEvent={false}
        clamp={false}>
        <Chart height={35} yExtents={(d: any) => d.volume}>
          <OHLCTooltip
            displayTexts={{
              d: '',
              o: 'Open',
              h: 'High',
              l: 'Low',
              c: 'Close',
              v: 'Vol',
            }}>
            {(_props: any, _moreProps: any, itemsToDisplay: any) => <MyOHLCTooltip {...itemsToDisplay} />}
          </OHLCTooltip>
        </Chart>
        <Chart
          height={height - 160}
          id={1}
          yExtents={[(d: any) => [d.high, d.low], tma10.accessor(), tma3.accessor()]}
          origin={(w: any, h: any) => [0, 35]}>
          <YAxis
            axisAt="right"
            orient="right"
            tickStroke="#8a8d93"
            stroke="#2a2f55"
            opacity={0}
            tickStrokeOpacity={0.1}
            zoomEnabled={false}
            fontFamily="Muli,sans-serif"
            fontSize={14}
            {...yGrid}
          />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format('.1f')}
            {...mouseEdgeAppearance}
            fill="transparent"
            textFill="#8a8d93"
            fontFamily="Muli,sans-serif"
            fontSize={14}
            arrowWidth={0}
            strokeOpacity={0}
          />
          <LineSeries yAccessor={tma10.accessor()} stroke={tma10.stroke()} />
          <LineSeries yAccessor={tma3.accessor()} stroke={tma3.stroke()} />
          <CandlestickSeries
            fill={(d: any) => (d.close < d.open ? '#F04B4B' : '#16CEB9')}
            wickStroke={(d: any) => (d.close < d.open ? '#F04B4B' : '#16CEB9')}
            stroke={(d: any) =>
              d.close - d.open <= -1 || d.close - d.open >= 1 ? '#2a2f55' : d.close < d.open ? '#F04B4B' : '#16CEB9'
            }
            opacity={1}
            id={0}
          />
          <PriceCoordinate
            price={closeLast}
            lineOpacity={1}
            lineStroke={closeLast < openLast ? '#F04B4B' : '#16CEB9'}
            displayFormat={format('.2f')}
          />
          <EdgeIndicator
            itemType="last"
            orient="right"
            edgeAt="right"
            yAccessor={(d: any) => d.close}
            fill={(d: any) => (d.close < d.open ? '#F04B4B' : '#16CEB9')}
            arrowWidth={0}
            lineStroke={closeLast < openLast ? '#F04B4B' : '#16CEB9'}
          />
        </Chart>
        <Chart id={2} height={50} yExtents={(d: any) => d.volume} origin={(w: any, h: any) => [0, h - 50]}>
          <XAxis
            axisAt="bottom"
            orient="bottom"
            tickStroke="#8a8d93"
            stroke="#2a2f55"
            tickStrokeOpacity={0.1}
            zoomEnabled={false}
            fontFamily="Muli,sans-serif"
            fontSize={14}
          />
          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={(date: any) => moment(date).format(`hh:mm:ss A`)}
            fontFamily="Muli,sans-serif"
            fontSize={13}
          />
          <BarSeries
            yAccessor={(d: any) => (d.volume > 80 ? 80 - random(0, 10) : d.volume)}
            fill={(d: any) => (d.close < d.open ? '#F04B4B' : '#16CEB9')}
            opacity={1}
          />
          <CrossHairCursor strokeDasharray="Solid" stroke="#8a8d93" />
        </Chart>
      </ChartCanvas>
    </>
  );
});

export default fitWidth(CandleStickChartWithMACDIndicator);

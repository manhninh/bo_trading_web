import ETHUSDT from 'assets/images/eth.png';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import indicatorsAll from 'highcharts/indicators/indicators-all';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {useMediaQuery} from 'react-responsive';
import {OHLC, Volumes} from '../highChartSocketContext/context';
import './styled.css';
indicatorsAll(Highcharts);

type IProps = {
  ohlc: OHLC[];
  volumes: Volumes[];
  height: number;
  xAxisMin: number;
};

const StockChartComponent = forwardRef((props: IProps, ref) => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1024px)'});
  const isTablet = useMediaQuery({query: '(min-width: 768px) and (max-width: 1023px)'});
  const isMobile = useMediaQuery({query: '(max-width: 767px)'});

  const chart = useRef(null);

  useImperativeHandle(ref, () => ({
    updateLastData(real_data: [number, number, number, number, number], real_volume: {x: number; y: number}) {
      const currentChart: any = chart.current;
      const seriesOhlc = currentChart.chart.series[0];
      const seriesVolume = currentChart.chart.series[1];
      if (seriesOhlc.data.length <= 0) return;
      var ohlcLast = seriesOhlc.data[seriesOhlc.data.length - 1];
      var volumeLast = seriesVolume.data[seriesVolume.data.length - 1];
      const open = seriesOhlc.data[seriesOhlc.data.length - 2].options.close;
      ohlcLast.update({
        open,
        high: real_data[2],
        low: real_data[3],
        close: real_data[4],
      });
      volumeLast.update({
        y: real_volume.y,
      });
      const yAxis = currentChart.chart.yAxis[0];
      const plotLine = yAxis.plotLinesAndBands[0];
      if (!plotLine) return;
      const plotElem = plotLine.svgElem;
      const d = plotElem.d.split(' ');
      const newY = yAxis.toPixels(real_data[4]) - d[2];
      if (plotElem) {
        plotElem.animate({translateY: newY}, 300);
        plotElem.attr('stroke', open < real_data[4] ? '#16CEB9' : '#F04B4B');
      }
      const label = plotLine.label;
      if (label) {
        label.animate({y: yAxis.toPixels(real_data[4])}, 300);
        label.attr(
          'text',
          `<span class="plot-line" style="background-color: ${
            open < real_data[4] ? '#16CEB9' : '#F04B4B'
          }">${real_data[4].toFixed(2)}</span>`,
        );
      }
    },
    addData(real_data: [number, number, number, number, number], real_volume: {x: number; y: number}) {
      const currentChart: any = chart.current;
      const seriesOhlc = currentChart.chart.series[0];
      const seriesVolume = currentChart.chart.series[1];
      if (seriesOhlc.data.length <= 0) return;
      var ohlcLast = seriesOhlc.data[seriesOhlc.data.length - 1];
      real_data[1] = ohlcLast.options.close;
      real_data[2] = ohlcLast.options.close;
      real_data[3] = ohlcLast.options.close;
      real_data[4] = ohlcLast.options.close;
      seriesOhlc.addPoint(real_data, true, true);
      seriesVolume.addPoint(real_volume, true, true);
      if (seriesOhlc.data[props.xAxisMin]) currentChart.chart.xAxis[0].setExtremes(seriesOhlc.data[props.xAxisMin].x);
      const yAxis = currentChart.chart.yAxis[0];
      const plotLine = yAxis.plotLinesAndBands[0];
      if (!plotLine) return;
      const label = plotLine.label;
      if (label) {
        label.animate({y: yAxis.toPixels(real_data[4])}, 300);
        label.attr(
          'text',
          `<span class="plot-line" style="background-color: ${
            real_data[1] < real_data[4] ? '#16CEB9' : '#F04B4B'
          }">${real_data[4].toFixed(2)}</span>`,
        );
      }
    },
  }));

  const options = {
    time: {useUTC: false},
    navigator: {enabled: false},
    rangeSelector: {enabled: false},
    scrollbar: {enabled: false},
    chart: {
      height: props.height,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Muli, sans-serif',
      },
      spacing: [50, 10, 0, 0],
    },
    plotOptions: {
      candlestick: {
        color: '#F04B4B',
        upColor: '#16CEB9',
        lineColor: '#F04B4B',
        upLineColor: '#16CEB9',
      },
      series: {
        marker: {enabled: false},
      },
    },
    yAxis: [
      {
        labels: {
          align: 'left',
          style: {
            color: '#8a8d93',
            fontSize: '14px',
          },
          padding: 0,
          x: 5,
          y: 4,
          format: '{value:,.0f}',
        },
        height: '90%',
        lineWidth: 0,
        gridLineWidth: 0.1,
        gridLineColor: '#8a8d93',
        plotLines: [
          {
            color: '#F04B4B',
            value: props.ohlc[props.ohlc.length - 1][4],
            dashStyle: 'Dash',
            label: {
              useHTML: true,
              align: 'right',
              verticalAlign: 'middle',
              textAlign: 'left',
              text: `<span class="plot-line">${props.ohlc[props.ohlc.length - 1][4]?.toFixed(2)}</span>`,
              x: 2,
              y: -2,
            },
          },
        ],
      },
      {
        labels: {enabled: false},
        top: '90%',
        height: '10%',
        lineWidth: 0,
        tickWidth: 0,
        tickLength: 0,
        gridLineWidth: 0,
      },
    ],
    xAxis: [
      {
        lineWidth: 0,
        tickWidth: 0,
        min: props.ohlc[props.xAxisMin][0],
      },
      {
        lineWidth: 0,
        tickWidth: 0,
        labels: {
          align: 'center',
          style: {
            color: '#8a8d93',
            fontSize: '15px',
          },
        },
        min: props.volumes[props.xAxisMin][0],
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.3)',
      padding: 0,
      positioner: () => ({
        x: isDesktopOrLaptop ? 130 : isTablet ? 150 : 75,
        y: isDesktopOrLaptop ? 0 : 5,
      }),
      shadow: false,
      shared: true,
      split: false,
      useHTML: true,
      formatter: function () {
        const points = this['points'];
        if (points.length >= 2) {
          return `<span class="tootipChart">Open: ${points[0].point.open}</span>
            <span class="tootipChart">Hight: ${points[0].point.high}</span>
            <span class="tootipChart">Low: ${points[0].point.low}</span>
            <span class="tootipChart">Close: ${points[0].point.close}</span>
            <span class="tootipChart">Volume: ${points[1].y}</span>`;
        } else {
          return `<span class="tootipChart">Volume: ${points[0].y}</span>`;
        }
      },
    },
    series: [
      {
        type: 'candlestick',
        id: 'stockChart',
        name: 'OHLC',
        data: props.ohlc,
      },
      {
        type: 'column',
        id: 'volume',
        name: 'Volume',
        data: props.volumes,
        yAxis: 1,
      },
      {
        type: 'ema',
        linkedTo: 'stockChart',
        params: {period: 10},
        enableMouseTracking: false,
        color: '#16CEB9',
      },
      {
        type: 'ema',
        linkedTo: 'stockChart',
        params: {period: 20},
        enableMouseTracking: false,
        color: '#F04B4B',
      },
    ],
  };

  return (
    <>
      <img src={ETHUSDT} className="icon-eth" />
      <HighchartsReact ref={chart} highcharts={Highcharts} constructorType={'stockChart'} options={options} />
    </>
  );
});

export default React.memo(StockChartComponent);

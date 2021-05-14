import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import moment from 'moment';
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState} from 'react';
import SocketContext, {ContextType, OHLC, Volumes} from '../highChartSocketContext/context';
import StockChart from './StockChart';
import './styled.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {formatter2} from 'utils/formatter';
import indicatorsAll from 'highcharts/indicators/indicators-all';
indicatorsAll(Highcharts);

type IProps = {
  ohlc: OHLC[];
  indicators: OHLC[];
  volumes: Volumes[];
  height: number;
};

const StockChartComponent = forwardRef((props: IProps, ref) => {
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
      yAxis.update({
        plotLines: [
          {
            color: open < real_data[4] ? '#16CEB9' : '#F04B4B',
            value: real_data[4],
            width: 0.5,
            label: {
              useHTML: true,
              align: 'right',
              verticalAlign: 'middle',
              textAlign: 'left',
              style: {
                color: '#FFFFFF',
                fontSize: '12px',
                fontFamily: 'Muli,sans-serif',
                backgroundColor: open < real_data[4] ? '#16CEB9' : '#F04B4B',
                padding: '4px 2px',
              },
              text: real_data[4].toString(),
              x: 2,
              y: -2,
            },
          },
        ],
      });
    },
    addData(real_data: [number, number, number, number, number], real_volume: {x: number; y: number}) {
      const currentChart: any = chart.current;
      const seriesOhlc = currentChart.chart.series[0];
      const seriesVolume = currentChart.chart.series[1];
      if (seriesOhlc.data.length <= 0) return;
      var ohlcLast = seriesOhlc.data[seriesOhlc.data.length - 1];
      var volumeLast = seriesVolume.data[seriesVolume.data.length - 1];
      real_data[1] = ohlcLast.options.close;
      real_data[2] = ohlcLast.options.close;
      real_data[3] = ohlcLast.options.close;
      real_data[4] = ohlcLast.options.close;
      seriesOhlc.addPoint(real_data, true, true);
      seriesVolume.addPoint(real_volume, true, true);
    },
  }));

  const options = {
    time: {
      useUTC: false,
    },
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    chart: {
      height: props.height,
      backgroundColor: 'transparent',
    },
    plotOptions: {
      candlestick: {
        color: '#F04B4B',
        upColor: '#16CEB9',
        lineColor: '#F04B4B',
        upLineColor: '#16CEB9',
      },
      series: {
        marker: {
          enabled: false,
        },
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
            width: 0.5,
            label: {
              useHTML: true,
              align: 'right',
              verticalAlign: 'middle',
              textAlign: 'left',
              style: {
                color: '#FFFFFF',
                fontSize: '12px',
                fontFamily: 'Muli,sans-serif',
                backgroundColor: '#F04B4B',
                padding: '4px 2px',
              },
              text: props.ohlc[props.ohlc.length - 1][4].toString(),
              x: 2,
              y: -2,
            },
          },
        ],
      },
      {
        labels: {
          enabled: false,
        },
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
        min: props.ohlc[40][0],
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
        min: props.ohlc[35][0],
      },
    ],
    tooltip: {
      pointFormat: '',
    },
    series: [
      {
        type: 'candlestick',
        id: 'stockChart',
        name: 'OHLC',
        data: props.ohlc,
        groupPadding: 0.1,
        point: {
          events: {
            mouseOver: function (event) {
              console.log(this, 'event');
              var chart = event.target.series.chart;
              if (!chart.lbl) {
                chart.lbl = chart.renderer
                  .label('')
                  .attr({
                    padding: 10,
                    r: 10,
                  })
                  .css({
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontFamily: 'Muli,sans-serif',
                  })
                  .add();
              }
              chart.lbl.show().attr({
                text:
                  'Open: ' +
                  event.target.open +
                  ' High: ' +
                  event.target.high +
                  ' Low: ' +
                  event.target.low +
                  ' Close: ' +
                  event.target.close,
              });
            },
            mouseOut: function (event) {
              var chart = event.target.series.chart;
              if (chart.lbl) {
                chart.lbl.hide();
              }
            },
          },
        },
      },
      {
        type: 'column',
        id: 'volume',
        name: 'Volume',
        data: props.volumes,
        yAxis: 1,
        groupPadding: 0.1,
      },
      {
        type: 'ema',
        name: 'EMA10',
        // data: props.indicators,
        linkedTo: 'stockChart',
        params: {
          period: 10,
        },
        enableMouseTracking: false,
        color: '#16CEB9',
      },
      {
        type: 'ema',
        linkedTo: 'stockChart',
        params: {
          period: 20,
        },
        enableMouseTracking: false,
        color: '#F04B4B',
      },
    ],
  };

  console.log(props.ohlc[35][0], 'stockchart');
  return <HighchartsReact ref={chart} highcharts={Highcharts} constructorType={'stockChart'} options={options} />;
});

export default React.memo(StockChartComponent);

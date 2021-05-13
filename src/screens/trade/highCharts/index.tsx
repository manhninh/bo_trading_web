import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import moment from 'moment';
import React, {useContext, useEffect, useRef, useState} from 'react';
import SocketContext, {ContextType, OHLC, Volumes} from '../highChartSocketContext/context';
import {IProps, IState} from './propState';
import StockChart from './StockChart';
import './styled.css';
import CanvasJSReact from 'assets/canvasjs-stock-1.2.16/canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import {formatter2} from 'utils/formatter';
import indicatorsAll from 'highcharts/indicators/indicators-all';
indicatorsAll(Highcharts);

const CryptoChartComponent = (props: IProps) => {
  const chartComponent = useRef(null);
  const {real_data, real_volume, timeTick, ohlc, volumes} = useContext<ContextType>(SocketContext);
  const [dataChart, setDataChart] = useState<IState>({
    isLoading: false,
    ohlc: new Array<OHLC>(),
    volumes: new Array<Volumes>(),
    options: null,
  });

  useEffect(() => {
    let initialData: any = dataChart.ohlc;
    if (real_data && real_volume) {
      if (initialData.length <= 0) {
        setDataChart({ohlc, volumes, options: null, isLoading: false});
      } else {
        const currentChart: any = chartComponent.current;
        const seriesOhlc = currentChart.chart.series[0];
        const seriesVolume = currentChart.chart.series[1];
        var ohlcLast = seriesOhlc.data[seriesOhlc.data.length - 1];
        var volumeLast = seriesVolume.data[seriesVolume.data.length - 1];
        if (timeTick === 0) {
          real_data[1] = ohlcLast.options.close;
          real_data[2] = ohlcLast.options.close;
          real_data[3] = ohlcLast.options.close;
          real_data[4] = ohlcLast.options.close;
          seriesOhlc.addPoint(real_data, true, true);
          seriesVolume.addPoint(real_volume, true, true);
        } else {
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
        }
      }
    }
  }, [timeTick]);

  useEffect(() => {
    if (dataChart.ohlc.length > 0 && !dataChart.isLoading) {
      const groupingUnits = [
        ['week', [1]],
        ['minute', [1, 2, 5, 10, 15, 30]],
      ];
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
          },
          {
            lineWidth: 0,
            tickWidth: 0,
            tickLength: 0,
            labels: {
              align: 'center',
              style: {
                color: '#8a8d93',
                fontSize: '15px',
              },
            },
          },
        ],

        tooltip: {
          enabled: false,
        },
        series: [
          {
            type: 'candlestick',
            id: 'stockChart',
            name: 'StockChart',
            data: dataChart.ohlc,
            groupPadding: 0,
          },
          {
            type: 'column',
            id: 'volume',
            name: 'Volume',
            data: dataChart.volumes,
            yAxis: 1,
            groupPadding: 0,
          },
          {
            type: 'ema',
            linkedTo: 'stockChart',
            params: {
              index: 0,
              period: 10,
            },
            enableMouseTracking: false,
          },
          {
            type: 'ema',
            linkedTo: 'stockChart',
            params: {
              period: 20,
            },
            enableMouseTracking: false,
          },
        ],
      };
      setDataChart((state) => ({...state, options, isLoading: true}));
    }
  }, [dataChart.ohlc]);

  return dataChart.isLoading ? (
    <HighchartsReact
      ref={chartComponent}
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={dataChart.options}
    />
  ) : (
    <SpinnerLoader />
  );
};

export default React.memo(CryptoChartComponent);

import ETHUSDT from 'assets/images/eth.png';
import SpinnerLoader from 'containers/components/loader';
import moment from 'moment';
import React, {forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState} from 'react';
import SocketContext, {ContextType, OHLC, Volumes} from '../apexChartSocketContext/context';
import StockChart from './StockChart';
import './styled.css';
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from 'apexcharts';
// import CanvasJSReact from 'assets/canvasjs-stock-1.2.16/canvasjs.stock.react';
import CanvasJSReact from 'assets/canvasjs-stock-1.2.16/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

type IProps = {
  ohlc: OHLC[];
  volumes: Volumes[];
  height: number;
};

const StockChartComponent = forwardRef((props: IProps, ref) => {
  const chart = useRef();

  useImperativeHandle(ref, () => ({
    updateLastData(lastData: []) {
      const currentChart: any = chart.current;
      var length = currentChart.options.data[0].dataPoints.length;
      currentChart.options.data[0].dataPoints[length - 1].y = lastData;
      currentChart.render();
    },
    addData(newData: []) {
      const currentChart: any = chart.current;
      var dps = currentChart.options.data[0].dataPoints;
      dps.push(newData);
      dps.shift();
      currentChart.options.data[0].dataPoints = dps;
      currentChart.render();
    },
  }));
  // componentDidUpdate() {
  //   var length = this.chart.options.data[0].dataPoints.length;
  //   if (this.props.updateLastData) {
  //     this.chart.options.data[0].dataPoints[length - 1].y = this.props.updateLastData;
  //     // this.chart.render();
  //   }
  //   if (this.props.addData) {
  //     var dps = this.chart.options.data[0].dataPoints;
  //     console.log(dps, 'dps');
  //     dps.push(this.props.addData);
  //     dps.shift();
  //     this.chart.options.data[0].dataPoints = dps;
  //     // this.chart.render();
  //   }
  // }

  // const options = {
  //   backgroundColor: 'transparent',
  //   theme: 'dark2',
  //   charts: [
  //     {
  //       animationEnabled: true,
  //       animationDuration: 500,
  //       axisX: {
  //         lineThickness: 0,
  //         tickLength: 0,
  //         labelFormatter: function (e) {
  //           return moment(e.value).format('HH:mm:ss');
  //         },
  //         crosshair: {
  //           enabled: true,
  //           snapToDataPoint: true,
  //           labelFormatter: function (e) {
  //             return '';
  //           },
  //         },
  //       },
  //       axisY2: {
  //         prefix: '$',
  //       },
  //       toolTip: {
  //         shared: true,
  //       },
  //       data: [
  //         {
  //           name: 'OHLC',
  //           yValueFormatString: '$#,###.##',
  //           type: 'candlestick',
  //           dataPoints: this.props.ohlc,
  //         },
  //       ],
  //     },
  //   ],
  //   navigator: {
  //     enabled: false,
  //   },
  //   rangeSelector: {
  //     enabled: false,
  //   },
  // };

  const options = {
    height: props.height,
    backgroundColor: 'transparent',
    theme: 'dark2',
    animationEnabled: true,
    animationDuration: 500,
    axisX: {
      margin: 0,
      lineThickness: 0,
      tickLength: 0,
      labelFormatter: function (e) {
        return moment(e.value).format('HH:mm:ss');
      },
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function (e) {
          return moment(e.value).format('HH:mm:ss');
        },
      },
      labelFontFamily: 'Muli,sans-serif',
      labelFontSize: 14,
    },
    axisY2: {
      tickLength: 0,
      margin: 0,
      labelFontFamily: 'Muli,sans-serif',
      labelFontSize: 14,
      gridThickness: 0.1,
      gridColor: '#8a8d93',
    },
    data: [
      {
        name: 'OHLC',
        type: 'candlestick',
        dataPoints: props.ohlc,
        axisYType: 'secondary',
      },
    ],
  };
console.log("stockchart")
  return <CanvasJSChart onRef={(ref) => (chart.current = ref)} options={options} />;
  // render() {
  //   const options = {
  //     theme: 'dark2', // "light1", "light2", "dark1", "dark2"
  //     backgroundColor: 'transparent',
  //     axisY2: {
  //       prefix: '$',
  //     },
  //     toolTip: {
  //       shared: true,
  //     },
  //     data: [
  //       {
  //         name: 'OHLC',
  //         yValueFormatString: '$#,###.##',
  //         axisYType: 'secondary',
  //         type: 'candlestick',
  //         dataPoints: this.props.ohlc,
  //       },
  //     ],
  //   };

  //   const containerProps = {
  //     width: '100%',
  //     height: `${this.props.height}px`,
  //     margin: 'auto',
  //   };

  //   return (

  //       <CanvasJSChart
  //         containerProps={containerProps}
  //         options={options}
  //         /* onRef={ref => this.chart = ref} */
  //       />
  //   );
  // }
});

export default React.memo(StockChartComponent);

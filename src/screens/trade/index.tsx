import config from 'constants/config';
import {EVENTS} from 'constants/socketEvent';
import React, {useEffect, useRef, useState} from 'react';
import {Nav, Tab} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import socketIOClient, {Socket} from 'socket.io-client';
import ContainerLayout from './containerLayout';
import CryptoChart from './cryptoChart';
import Indicator from './indicator';
import LastResult from './lastResult';
import {setTimeTick} from './redux/slice';
import './styled.css';

const height = window.innerHeight - 322;

const TradingComponent = () => {
  const dispatch = useDispatch();
  const [dataChart, setDataChart] = useState([]);
  const [candlestick, setCandlestick] = useState({
    data: {
      event_time: Date,
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      volume: 0,
      is_open: false,
    },
    timeTick: 0,
  });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    configWsCandlestick();
    return () => {
      socketRef.current?.off(EVENTS.BLOCKS_ETHUSDT);
      socketRef.current?.off(EVENTS.ETHUSDT_REALTIME);
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    let initialData: any = [...dataChart];
    if (initialData.length > 0 && candlestick.data) {
      candlestick.data.open = initialData[initialData.length - 2].close;
      candlestick.data.is_open = !candlestick.data.is_open;
      initialData[initialData.length - 1] = candlestick.data;

      if (candlestick.timeTick === 0 || candlestick.timeTick === 30) {
        const newBlock = Object.assign({}, candlestick.data);
        newBlock.open = initialData[initialData.length - 1].close;
        newBlock.close = initialData[initialData.length - 1].close;
        newBlock.high = initialData[initialData.length - 1].close;
        newBlock.low = initialData[initialData.length - 1].close;
        newBlock.is_open = !newBlock.is_open;
        initialData.push(newBlock);
        initialData[initialData.length - 2].is_open = !initialData[initialData.length - 2].is_open;
        initialData.shift();
      }
      setDataChart(initialData);
    }
  }, [candlestick.timeTick]);

  /** config socket connect */
  const configWsCandlestick = () => {
    socketRef.current = socketIOClient(config.WS_CANDLESTICK?.toString() || '');

    socketRef.current?.on('connect', () => {
      console.log(socketRef.current?.id);
      socketRef.current?.emit('ethusdt');
    });

    socketRef.current?.on(EVENTS.BLOCKS_ETHUSDT, function (data) {
      console.log('load block');
      setDataChart(data);
    });

    socketRef.current?.on(EVENTS.ETHUSDT_REALTIME, function (data) {
      console.log(data, 'data');
      dispatch(setTimeTick(data.timeTick % 30));
      setCandlestick({
        data: data.candlestick,
        timeTick: data.timeTick,
      });
    });
  };

  return (
    <ContainerLayout>
      <div className="row">
        <div className="col-lg-12" style={{height}}>
          <CryptoChart height={height} />
        </div>
        <div className="col-lg-12">
          <div className="card text-center" style={{height: '250px', marginBottom: 0, width: '100%'}}>
            <Tab.Container defaultActiveKey="indicator">
              <div className="card-header">
                <Nav className="nav-tabs card-header-tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="indicator">Indicator</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="last_result">Last Result</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div className="card-body py-0">
                <Tab.Content>
                  <Tab.Pane eventKey="indicator">
                    <Indicator />
                  </Tab.Pane>
                  <Tab.Pane eventKey="last_result">
                    <LastResult />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      </div>
    </ContainerLayout>
  );
};

export default React.memo(TradingComponent);

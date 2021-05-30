import React, {useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setTotalBuy, setTotalSell, setWinLoss} from 'screens/trade/redux/slice';
import useSound from 'use-sound';
import loseSound from './lose.mp3';
import './styled.css';
import winSound from './win.mp3';

type IProps = {
  result: number | null;
  openModal: boolean;
};

const Props: IProps = {
  result: null,
  openModal: false,
};

const WinLossComponent = (props: IProps = Props) => {
  const dispatch = useDispatch();
  const [playWin] = useSound(winSound);
  const [playLose] = useSound(loseSound);

  useEffect(() => {
    if (props.result) {
      props.result >= 0 ? playWin() : playLose();
      // 2s sau tắt thông báo
      setTimeout(() => {
        dispatch(setTotalBuy(0));
        dispatch(setTotalSell(0));
        dispatch(setWinLoss({amount_demo: null, amount_expert: null, amount_trade: null}));
      }, 2000);
    }
  }, [props.result]);

  return (
    <Modal
      show={props.result && props.result >= 0 ? true : false}
      centered={true}
      dialogClassName="modal-w-90-per"
      contentClassName="modal-content-custom">
      <Modal.Body className="modal-body-custom">
        <img src={process.env.PUBLIC_URL + '/img/win.png'} alt="" />
        <h1 className="text-result" style={{color: '#FFF'}}>
          + {props.result} USDF
        </h1>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(WinLossComponent);

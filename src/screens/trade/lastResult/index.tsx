import {RootState, useAppSelector} from 'boot/configureStore';
import React, {useMemo, useRef} from 'react';
import {isMobile} from 'react-device-detect';
import {createSelector} from 'reselect';
import './styled.css';

const LastResultComponent = () => {
  const blockBuyRef = useRef(0);
  const blockSellRef = useRef(0);

  const selectorBlocks = useMemo(
    () =>
      createSelector(
        (state: RootState) => state.tradeState.blocks,
        (_: any, _props: []) => _props,
        (blocks, _props) => {
          if (blocks.length > 0) {
            let totalBuy = 0;
            blocks.filter((item) => (totalBuy += item.data.filter((i: boolean | null) => i === false).length));
            blockBuyRef.current = totalBuy;
            let totalSell = 0;
            blocks.filter((item) => (totalSell += item.data.filter((i: boolean | null) => i === true).length));
            blockSellRef.current = totalSell;
          }
          return blocks;
        },
      ),
    [],
  );
  const blocks = useAppSelector((state) => selectorBlocks(state, []));

  const rederResults = () => {
    const html: any[] = [];
    if (blocks.length > 0) {
      blocks.map((item, index: number) => {
        const htmlChil: any[] = [];
        item.data.map((i: any, idex: number) => {
          htmlChil.push(
            i != null ? (
              <div
                key={`win_loss_${idex}`}
                className="div-win-loss"
                style={{backgroundColor: i == true ? '#f04b4b' : '#16ceb9'}}
              />
            ) : (
              <div key={`win_loss_${idex}`} className="div-win-loss" />
            ),
          );
        });
        html.push(
          <div className="div-result-group" key={`key_main${index}`}>
            {htmlChil}
          </div>,
        );
      });
    }
    return html;
  };

  return (
    <div className="div-lastresult">
      {rederResults()}
      {isMobile ? null : (
        <div className="div-total-result">
          <div className="text-left">
            <h3 className="d-inline-block">BUY</h3>
            <h3 className="text-info d-inline-block m-l-rem">{blockBuyRef.current}</h3>
          </div>
          <div className="text-left">
            <h3 className="d-inline-block">SELL</h3>
            <h3 className="text-danger d-inline-block ml-5">{blockSellRef.current}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LastResultComponent);

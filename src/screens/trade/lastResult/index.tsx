import {RootState, useAppSelector} from 'boot/configureStore';
import React, {useMemo, useRef} from 'react';
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
            blockBuyRef.current = blocks.filter((item) => !item.result).length;
            blockSellRef.current = blocks.filter((item) => item.result).length;
          }
          return blocks;
        },
      ),
    [],
  );
  const blocks = useAppSelector((state) => selectorBlocks(state, []));

  console.log('LastResultComponent');
  return (
    <div
      className=""
      style={{margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '170px'}}>
      <div style={{width: '720px', maxWidth: '720px', textAlign: 'left', display: 'inline-block'}}>
        {blocks.length > 0 &&
          blocks.map((item, index: number) => {
            return (
              <div
                key={`win_loss_${index}`}
                className="div-win-loss"
                style={{backgroundColor: item.result ? '#f04b4b' : '#16ceb9'}}
              />
            );
          })}
      </div>
      <div style={{display: 'inline-block', width: '140px', maxWidth: '140px', marginLeft: '20px'}}>
        <div className="text-left">
          <h3 className="d-inline-block">BUY</h3>
          <h3 className="text-info d-inline-block" style={{marginLeft: '3.4rem'}}>
            {blockBuyRef.current}
          </h3>
        </div>
        <div className="text-left">
          <h3 className="d-inline-block">SELL</h3>
          <h3 className="text-danger d-inline-block ml-5">{blockSellRef.current}</h3>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LastResultComponent);

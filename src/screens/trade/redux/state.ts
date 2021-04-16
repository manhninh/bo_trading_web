export type Indicator = {
  oscillatorsBuy: number,
  oscillatorsNeutral: number,
  oscillatorsSell: number,
  maBuy: number,
  maNeutral: number,
  maSell: number,
  macdBuy: number,
  macdNeutral: number,
  macdSell: number,
  totalBuy: number,
  totalNeutral: number,
  totalSell: number,
  indicator_type: number,
  indicator: number,
};

export type TradeState = {
  timeTick: number;
  isTrade: boolean;
  indicator: Indicator;
};

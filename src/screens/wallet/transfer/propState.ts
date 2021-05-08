// spot, trade, expert, copytrade
export enum TYPE_WALLET {
  SPOT = 'spot',
  TRADE = 'trade',
  EXPERT = 'expert',
  COPY_TRADE = 'copytrade'
}

export enum TRANSACTION_STATUS {
  PENDING,
  SUCCESS,
  CANCELLED
}

export type IProps = {
  onRequestRefesh: (tabActive: string) => void;
  amount: Required<number>;
  type_wallet: TYPE_WALLET | undefined;
  // chỉ sử dụng chức năng chuyển tiền nội bộ
  onlyInAccount?: boolean;
};

export const Props: IProps = {
  onRequestRefesh: () => { },
  onlyInAccount: true,
  amount: 0,
  type_wallet: undefined
};

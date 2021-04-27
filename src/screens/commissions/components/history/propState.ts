export type IProps = {
  tabActive: NameRoutes;
  requestRefesh?: string | null;
  renderTable: {
    headers: string[],
    props: any[];
  };
};

export enum NameRoutes {
  TRADING = 'trading',
  COPY_TRADE = 'copy_trade',
  HISTORY_WITHDRAW = 'history_withdraw',
  MEMBER_LIST = 'member_list',
}

export const Props: IProps = {
  tabActive: NameRoutes.TRADING,
  renderTable: {
    headers: [],
    props: []
  }
};

export type State = {

};

export type FilterSearch = {
  from: Date;
  to: Date;
};
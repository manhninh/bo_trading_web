export type IProps = {
  tabActive: string;
  requestRefesh?: string | null;
};

export const Props: IProps = {
  tabActive: 'DEPOSIT',
  requestRefesh: null
};

export type State = {

};

export type FilterSearch = {
  from: Date;
  to: Date;
};
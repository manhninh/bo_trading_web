export type IProps = {
  noBackground?: boolean;
};

export const Props: IProps = {
  noBackground: false,
};

export type State = {
  openSignIn: boolean;
  openSignUp: boolean;
  isAuthen: boolean;
};
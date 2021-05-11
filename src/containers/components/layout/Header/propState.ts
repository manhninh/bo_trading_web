export type IProps = {
  noBackground?: boolean;
  openLogin: boolean;
  openRegister: boolean;
  cbOpenLogin?: () => void;
  cbOpenRegister?: () => void;
};

export const Props: IProps = {
  noBackground: false,
  openLogin: false,
  openRegister: false,
};

export type State = {
  openSignIn: boolean;
  openSignUp: boolean;
  isAuthen: boolean;
};

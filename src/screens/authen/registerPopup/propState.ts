export type State = {
  username: string;
  password: string;
  isOpen: boolean;
};

export type Props = {
  isOpen: boolean;
  callbackToogle: () => void;
};
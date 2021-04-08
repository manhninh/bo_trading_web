export type State = {
  isOpen: boolean;
};

export type Props = {
  isOpen: boolean;
  callbackToogle: () => void;
};
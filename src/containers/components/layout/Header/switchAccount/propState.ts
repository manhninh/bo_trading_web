export type AccountType = {
  type: number;
  type_name: string;
  amount: number;
};

export type State = {
  currentAccount: AccountType;
  listAccountOther: AccountType[];
};

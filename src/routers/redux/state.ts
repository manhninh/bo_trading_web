export type AccountInfor = {
  username: string;
};

export type AuthState = {
  isSignedOut: boolean;
  isSignedIn: boolean;
  userToken: string | null | undefined;
  accountInfor: AccountInfor;
};

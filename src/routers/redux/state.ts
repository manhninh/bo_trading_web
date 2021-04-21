export type AccountInfor = {
  username: string | null;
  refresh_token: string | null;
  expires_in: number;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  ref_code: string | null;
  amount_trade: number;
  amount_demo: number;
  amount_expert: number;
  amount_copytrade: number;
  type_user: number;

};

export type AuthState = {
  isSignedOut: boolean;
  isSignedIn: boolean;
  userToken: string | null | undefined;
  accountInfor: AccountInfor;
};

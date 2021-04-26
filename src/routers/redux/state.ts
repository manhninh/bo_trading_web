export type AccountInfor = {
  _id: string | null;
  username: string | null;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar: string | null;
  ref_code: string | null;
  amount_trade: number;
  amount_demo: number;
  amount_expert: number;
  amount_copytrade: number;
  type_user: number;
  isEnabledTFA: boolean;
  is_sponsor: boolean;
};

export type AuthState = {
  isSignedOut: boolean;
  isSignedIn: boolean;
  userToken: string | null | undefined;
  accountInfor: AccountInfor;
};

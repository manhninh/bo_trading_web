export type AccountInfor = {
  username: string;
  ma_cty: string;
  ma_nvgh: string;
  ten_nvgh: string;
  gioi_tinh: string;
  so_cmnd: string;
  dien_thoai: string;
  dia_chi_thuong_tru: string;
  dia_chi_cho_o: string;
  is_kythuat: boolean;
}

export type AuthState = {
  isSignedOut: boolean;
  isSignedIn: boolean;
  userToken: string | null | undefined;
  accountInfor: AccountInfor;
}
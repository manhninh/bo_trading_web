import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RESPONSE_STATUS } from 'contants/config'
import { AccountInfor, AuthState } from './state'
import { fetchLogin } from './thunks'

export const initialAuthState: AuthState = {
  isSignedOut: false,
  isSignedIn: false,
  userToken: null,
  accountInfor: {
    username: "",
    ma_cty: "",
    ma_nvgh: "",
    ten_nvgh: "",
    gioi_tinh: "",
    so_cmnd: "",
    dien_thoai: "",
    dia_chi_thuong_tru: "",
    dia_chi_cho_o: "",
    is_kythuat: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    toSignInPage: (state: AuthState) => ({
      ...state,
      isSignedIn: false,
      userToken: null,
      accountInfor: {
        username: "",
        ma_cty: "",
        ma_nvgh: "",
        ten_nvgh: "",
        gioi_tinh: "",
        so_cmnd: "",
        dien_thoai: "",
        dia_chi_thuong_tru: "",
        dia_chi_cho_o: "",
        is_kythuat: false
      }
    }),
    signIn: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      isSignedOut: false,
      isSignedIn: true,
      userToken: action.payload
    }),
    signOut: (state: AuthState) => ({
      ...state, isSignedOut: true
    }),
    restoreToken: (state: AuthState, action: PayloadAction<AccountInfor>) => ({
      ...state, accountInfor: action.payload
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.result.status.code === RESPONSE_STATUS.SUCESS && payload.result.data.token) {
          state.isSignedOut = false;
          state.isSignedIn = true;
          state.userToken = action.payload.result.data?.token;
          state.accountInfor = {
            username: action.payload.username,
            ma_cty: "",
            ma_nvgh: "",
            ten_nvgh: "",
            gioi_tinh: "",
            so_cmnd: "",
            dien_thoai: "",
            dia_chi_thuong_tru: "",
            dia_chi_cho_o: "",
            is_kythuat: false
          };
        } else throw Error("Tài khoản hoặc mật khẩu không đúng!");
      }).addCase(fetchLogin.rejected, (state, action) => { throw action.payload; })
  }
})

export const { toSignInPage, restoreToken, signIn, signOut } = authSlice.actions

export default authSlice.reducer
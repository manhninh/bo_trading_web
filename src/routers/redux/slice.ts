import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORE } from 'constants/system';
import { AccountInfor, AuthState } from './state';
import { fetchChangeTypeUser, fetchLogin } from './thunks';

export const initialAuthState: AuthState = {
  isSignedOut: false,
  isSignedIn: false,
  userToken: null,
  accountInfor: {
    _id: null,
    username: null,
    email: null,
    full_name: null,
    phone: null,
    avatar: null,
    ref_code: null,
    amount: 0,
    amount_trade: 0,
    amount_demo: 0,
    amount_expert: 0,
    amount_copytrade: 0,
    type_user: 0,
    isEnabledTFA: false,
    is_sponsor: false,
    is_expert: false
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    toSignInPage: (state: AuthState) => ({
      ...state,
      isSignedIn: false,
      userToken: null,
      accountInfor: {
        _id: null,
        username: null,
        full_name: null,
        phone: null,
        email: null,
        avatar: null,
        ref_code: null,
        amount: 0,
        amount_trade: 0,
        amount_demo: 0,
        amount_expert: 0,
        amount_copytrade: 0,
        type_user: 0,
        isEnabledTFA: false,
        is_sponsor: false,
        is_expert: false
      },
    }),
    signIn: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      isSignedOut: false,
      isSignedIn: true,
      userToken: action.payload,
    }),
    signOut: (state: AuthState) => ({
      ...state,
      isSignedOut: true,
    }),
    restoreAccount: (state: AuthState, action: PayloadAction<AccountInfor>) => ({
      ...state,
      accountInfor: { ...state.accountInfor, ...action.payload },
    }),
    changeStatusTFA: (state: AuthState, action: PayloadAction<boolean>) => ({
      ...state,
      accountInfor: { ...state.accountInfor, isEnabledTFA: action.payload },
    }),
    updateAvatar: (state: AuthState, action: PayloadAction<string>) => ({
      ...state,
      accountInfor: { ...state.accountInfor, avatar: action.payload },
    }),
    updateAmount: (state: AuthState, action: PayloadAction<Partial<AccountInfor>>) => ({
      ...state,
      accountInfor: { ...state.accountInfor, ...action.payload },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.result) {
          state.isSignedOut = false;
          state.isSignedIn = true;
          state.userToken = `${action.payload.result.token_type} ${action.payload.result.access_token}`;
          localStorage.setItem(
            LOCAL_STORE.TOKEN,
            `${action.payload.result.token_type} ${action.payload.result.access_token}`,
          );
          state.accountInfor = {
            _id: null,
            username: action.payload.username,
            email: null,
            full_name: null,
            phone: null,
            avatar: null,
            ref_code: null,
            amount: 0,
            amount_trade: 0,
            amount_demo: 0,
            amount_expert: 0,
            amount_copytrade: 0,
            type_user: 0,
            isEnabledTFA: false,
            is_sponsor: false,
            is_expert: false,
          };
        } else throw Error('Login fail!');
      })
      .addCase(fetchLogin.rejected, (_state, action) => {
        throw action.payload;
      })
      .addCase(fetchChangeTypeUser.fulfilled, (state, action) => {
        const payload = action.payload;
        if (payload.result) {
          state.accountInfor = {
            ...state.accountInfor,
            ...payload.result,
            type_user: payload.type_user,
          };
        } else throw Error('Change type account fail!');
      })
      .addCase(fetchChangeTypeUser.rejected, (state, action) => {
        throw action.payload;
      });
  },
});

export const { toSignInPage, restoreAccount, signIn, signOut, changeStatusTFA, updateAvatar, updateAmount } = authSlice.actions;

export default authSlice.reducer;

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LOCAL_STORE} from 'constants/system';
import {AccountInfor, AuthState} from './state';
import {fetchLogin} from './thunks';

export const initialAuthState: AuthState = {
  isSignedOut: false,
  isSignedIn: false,
  userToken: null,
  accountInfor: {
    username: null,
    refresh_token: null,
    expires_in: 0,
    email: null,
    ref_code: null,
    amount_trade: 0,
    amount_demo: 0,
    amount_expert: 0,
    amount_copytrade: 0,
    type_user: 0,
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
        username: null,
        refresh_token: null,
        expires_in: 0,
        email: null,
        ref_code: null,
        amount_trade: 0,
        amount_demo: 0,
        amount_expert: 0,
        amount_copytrade: 0,
        type_user: 0,
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
    restoreToken: (state: AuthState, action: PayloadAction<AccountInfor>) => ({
      ...state,
      accountInfor: {...state.accountInfor, ...action.payload},
    }),
    /** other */
    changeTypeUser: (state: AuthState, action: PayloadAction<number>) => ({
      ...state,
      accountInfor: {...state.accountInfor, type_user: action.payload},
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
            username: action.payload.username,
            refresh_token: action.payload.result.refresh_token,
            expires_in: action.payload.result.expires_in,
            email: null,
            ref_code: null,
            amount_trade: 0,
            amount_demo: 0,
            amount_expert: 0,
            amount_copytrade: 0,
            type_user: 0,
          };
        } else throw Error('Login fail!');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        throw action.payload;
      });
  },
});

export const {toSignInPage, restoreToken, signIn, signOut, changeTypeUser} = authSlice.actions;

export default authSlice.reducer;

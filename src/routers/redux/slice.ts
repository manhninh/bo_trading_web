import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RESPONSE_STATUS} from 'constants/system';
import {AccountInfor, AuthState} from './state';
import {fetchLogin} from './thunks';

export const initialAuthState: AuthState = {
  isSignedOut: false,
  isSignedIn: false,
  userToken: null,
  accountInfor: {
    username: '',
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
        username: '',
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
      accountInfor: action.payload,
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
          };
        } else throw Error('Login fail!');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        throw action.payload;
      });
  },
});

export const {toSignInPage, restoreToken, signIn, signOut} = authSlice.actions;

export default authSlice.reducer;

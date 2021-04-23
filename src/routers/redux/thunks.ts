import {createAsyncThunk} from '@reduxjs/toolkit';
import config from 'constants/config';
import configServices from 'utils/configServices';

type Auth = {
  username: string;
  password: string;
};

export const fetchLogin = createAsyncThunk('auth/login', async (auth: Auth, thunkAPI) => {
  try {
    const result = await configServices.postService('oauth/token', {
      username: auth.username,
      password: auth.password,
      grant_type: 'password',
      client_id: config.CLIENT_ID,
      client_secret: config.CLIENT_SECRET,
      scope: config.SCOPE,
    });
    return {result, username: auth.username};
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchChangeTypeUser = createAsyncThunk('auth/change_type_user', async (type_user: number, thunkAPI) => {
  try {
    const result = await configServices.getService('users');
    return {result: result.data[0], type_user};
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

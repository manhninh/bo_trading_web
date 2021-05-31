import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'boot/configureStore';
import configServices from 'utils/configServices';

export const fetchCurrentOrder =
  createAsyncThunk<any, undefined, { state: RootState; }>('orders/current-order', async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const result = await configServices.getService('orders/current-order', {
        typeUser: state.authState.accountInfor.type_user.toString(),
      });
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  });

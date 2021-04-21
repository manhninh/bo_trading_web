import {createAsyncThunk} from '@reduxjs/toolkit';
import configServices from 'utils/configServices';

export const fetchCurrentOrder = createAsyncThunk('orders/current-order', async (type_user: number, thunkAPI) => {
  try {
    const result = await configServices.getService('orders/current-order', {
      typeUser: type_user.toString(),
    });
    return result.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

import { createAsyncThunk } from "@reduxjs/toolkit";
import configServices from "utils/configServices";

type Auth = {
  username: string,
  password: string
}

export const fetchLogin= createAsyncThunk("auth/login", async (auth: Auth, thunkAPI) => {
  try {
    const result = await configServices.getService('sys/login', { username: auth.username, password: auth.password }, null, false);
    return {result, username: auth.username};
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
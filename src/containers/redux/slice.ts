import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommonState } from './state'

export const initialCommonState: CommonState = {
  isLoading: false
}

const commonSlice = createSlice({
  name: 'common',
  initialState: initialCommonState,
  reducers: {
    isLoading: (state: CommonState, action: PayloadAction<boolean>) => ({
      ...state, isLoading: action.payload
    })
  }
})

export const { isLoading } = commonSlice.actions

export default commonSlice.reducer
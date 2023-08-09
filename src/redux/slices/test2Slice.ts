import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BoolState {
  value: boolean
}

const initialState: BoolState = {
  value: false,
}

export const booleanSlice = createSlice({
  name: 'bool',
  initialState,
  reducers: {
    switchBool: (state) => {
      state.value = !state.value
    },
    setBool: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { switchBool, setBool } = booleanSlice.actions

export default booleanSlice.reducer
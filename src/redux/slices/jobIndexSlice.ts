import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface jobIndexState {
  value: number
}

const initialState: jobIndexState = {
  value: 0,
}

export const jobIndexSlice = createSlice({
  name: 'jobIndex',
  initialState,
  reducers: {
    prev: (state) => {
      state.value += 1
    },
    next: (state) => {
      state.value -= 1
    },
    setJobIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { prev, next, setJobIndex } = jobIndexSlice.actions

export default jobIndexSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import jobsArray from '../../util/jobsArray'

export interface jobIndexState {
  value: number
}

const initialState: jobIndexState = {
  value: 3,
}

export const jobIndexSlice = createSlice({
  name: 'jobIndex',
  initialState,
  reducers: {
    prev: (state) => {
      state.value > 0 ? state.value -= 1 : state.value = jobsArray.length-1
    },
    next: (state) => {
      state.value < jobsArray.length-1 ? state.value += 1 : state.value = 0
    },
    setJobIndex: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

export const { prev, next, setJobIndex } = jobIndexSlice.actions

export default jobIndexSlice.reducer
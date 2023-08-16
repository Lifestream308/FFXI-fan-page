import { createSlice } from '@reduxjs/toolkit'

export interface isModalShowingState {
  value: boolean
}

const initialState: isModalShowingState = {
  value: false,
}

export const isModalShowingSlice = createSlice({
  name: 'isModalShowing',
  initialState,
  reducers: {
    modalShowingTrue: (state) => {
      state.value = true
    },
    modalShowingFalse: (state) => {
      state.value = false
    },
  },
})

export const { modalShowingTrue, modalShowingFalse } = isModalShowingSlice.actions

export default isModalShowingSlice.reducer
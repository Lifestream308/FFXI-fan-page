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
    switchModalShowing: (state) => {
      state.value = !state.value
    },
  },
})

export const { switchModalShowing } = isModalShowingSlice.actions

export default isModalShowingSlice.reducer
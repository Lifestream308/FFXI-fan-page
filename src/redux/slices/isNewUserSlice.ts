import { createSlice } from '@reduxjs/toolkit'

export interface isNewUserState {
  value: boolean
}

const initialState: isNewUserState = {
  value: false,
}

export const isNewUserSlice = createSlice({
  name: 'isNewUser',
  initialState,
  reducers: {
    newUserTrue: (state) => {
      state.value = true
    },
    newUserFalse: (state) => {
      state.value = false
    },
  },
})

export const { newUserTrue, newUserFalse } = isNewUserSlice.actions

export default isNewUserSlice.reducer
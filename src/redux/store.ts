import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/testSlice'
import booleanReducer from './slices/test2Slice'
import jobIndexReducer from './slices/jobIndexSlice'
import isModalShowingReducer from './slices/isModalShowingSlice'
import isNewUserReducer from './slices/isNewUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    bool: booleanReducer,
    jobIndex: jobIndexReducer,
    isModalShowing: isModalShowingReducer,
    isNewUser: isNewUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
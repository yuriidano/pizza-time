import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterSlice'
import homeReducer from './homeSlice';
import musicReducer from './muicSlice';
import cartReducer from './cartSlice';


export const store = configureStore({
  reducer: {
    filterReducer,
    homeReducer,
    musicReducer,
    cartReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
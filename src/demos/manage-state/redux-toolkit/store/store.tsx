import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

/**
 * Redux store configuration using Redux Toolkit.
 *
 * configureStore automatically sets up:
 * - Redux DevTools Extension integration
 * - redux-thunk middleware for async actions
 * - Serialization checks in development
 * - Immutability checks in development
 */
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // Add other slice reducers here:
    // user: userReducer,
    // posts: postsReducer,
  },
});

/**
 * Root state type inferred from the store.
 * Use this type when selecting state with useAppSelector.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App dispatch type inferred from the store.
 * Use this type with useAppDispatch for typed dispatch.
 */
export type AppDispatch = typeof store.dispatch;

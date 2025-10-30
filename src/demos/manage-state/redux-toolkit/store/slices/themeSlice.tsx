import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Theme type - either light or dark mode
 */
export type Theme = 'light' | 'dark';

/**
 * Theme state interface for Redux store
 */
interface ThemeState {
  /** Current theme value */
  theme: Theme;
}

/**
 * Initial state for theme slice
 */
const initialState: ThemeState = {
  theme: 'light',
};

/**
 * Redux Toolkit slice for theme management.
 * Provides reducers for toggling and setting the theme.
 *
 * createSlice automatically generates action creators and action types
 * based on the reducers you define.
 */
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    /**
     * Toggle between light and dark themes
     */
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    /**
     * Set theme to a specific value
     */
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

/**
 * Action creators exported from the slice.
 * Use these in your components with dispatch:
 * dispatch(toggleTheme())
 * dispatch(setTheme('dark'))
 */
export const { toggleTheme, setTheme } = themeSlice.actions;

/**
 * Reducer to be added to the store
 */
export default themeSlice.reducer;

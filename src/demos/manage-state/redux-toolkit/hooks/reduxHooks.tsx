import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

/**
 * Typed version of useDispatch hook.
 * Use throughout your app instead of plain `useDispatch`.
 * This gives you proper TypeScript autocomplete for dispatch.
 *
 * @example
 * const dispatch = useAppDispatch();
 * dispatch(toggleTheme());
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of useSelector hook.
 * Use throughout your app instead of plain `useSelector`.
 * This gives you proper TypeScript autocomplete for state selection.
 *
 * @example
 * const theme = useAppSelector((state) => state.theme.theme);
 */
export const useAppSelector = useSelector.withTypes<RootState>();

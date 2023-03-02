import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import layoutReducer from '../features/layout/layoutSlice';
import sidebarOptionsReducer from '../features/sidebar/slidebarSlice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    sidebarOptions: sidebarOptionsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

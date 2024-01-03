import { configureStore } from '@reduxjs/toolkit';
import favoriteSlice from './features/favoriteSlice';
import citySlice from './features/citySlice';
import tempUnitSlice from './features/tempUnitSlice';
import themeSlice from './features/themeSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    favoriteSlice,
    citySlice,
    tempUnitSlice,
    themeSlice
  }
});

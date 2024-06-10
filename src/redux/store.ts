import { configureStore } from '@reduxjs/toolkit';
import { artApi } from './query/artApi';

import currentPageReducer from './slices/pageSlice';
import filter from './slices/filterSlice';
import theme from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    filter,
    currentPage: currentPageReducer,
    theme,
    [artApi.reducerPath]: artApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

'use client';

import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './articleSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
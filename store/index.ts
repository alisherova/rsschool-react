'use client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import themeReducer from './themeSlice';
import characterReducer from './characterSlice';
import searchReducer from './searchSlice';
import paginationReducer from './paginationSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

// Define the root reducer
export const rootReducer = combineReducers({
  theme: themeReducer,
  character: characterReducer,
  search: searchReducer,
  pagination: paginationReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Configure the store
export const setupStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(apiSlice.middleware);
    },
  });
};
// Create the store
export const store = setupStore();
setupListeners(store.dispatch);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

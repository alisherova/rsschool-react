import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import themeReducer from './themeSlice';
import characterReducer from './characterSlice';
import searchReducer from './searchSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    character: characterReducer,
    search: searchReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

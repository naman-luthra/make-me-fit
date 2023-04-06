import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/Login/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

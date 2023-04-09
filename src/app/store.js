import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/Login/authSlice';
import { dataSlice } from '../features/userData/dataSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

import { configureStore } from '@reduxjs/toolkit'
import navigationReducer from '../features/navigation/navigationSlice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer
  }
});

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
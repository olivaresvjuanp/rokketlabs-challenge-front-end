import { configureStore } from '@reduxjs/toolkit';

import { animalsSlice } from '../features/animals/animalsSlice';

export const store = configureStore({
  reducer: {
    animals: animalsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

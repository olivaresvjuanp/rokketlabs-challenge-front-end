import { configureStore } from '@reduxjs/toolkit';

import { animalsListSlice } from '../features/animalsList/animalsListSlice';
import { systemSlice } from '../features/system/systemSlice';

export const store = configureStore({
  reducer: {
    animals: animalsListSlice.reducer,
    system: systemSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

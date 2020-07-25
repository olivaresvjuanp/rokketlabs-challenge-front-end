import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { animalsListSlice } from '../features/animalsList/animalsListSlice';
import { notificationsSlice } from '../features/notifications/notificationsSlice';
import { systemSlice } from '../features/system/systemSlice';

export const store = configureStore({
  reducer: {
    animals: animalsListSlice.reducer,
    notifications: notificationsSlice.reducer,
    system: systemSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend() // ...
      .concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;

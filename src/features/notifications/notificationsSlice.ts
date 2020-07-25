import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

type Notification = {
  key: string;
  message: string;
  variant: 'default' | 'error' | 'success' | 'warning';
}

type NotificationsState = {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: []
};

/**
 * Slice:
 * https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(notification => {
        return notification.key !== action.payload
      });
    }
  }
});

export const {
  addNotification,
  removeNotification
} = notificationsSlice.actions;

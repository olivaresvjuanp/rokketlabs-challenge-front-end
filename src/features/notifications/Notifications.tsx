import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { useSnackbar } from 'notistack';

import { removeNotification } from './notificationsSlice';
import { RootState } from '../../app/store';

let displayed: string[] = [];

export const Notifications: React.FunctionComponent = () => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  React.useEffect(() => {
    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed.
      if (displayed.includes(notification.key))
        return;

      // Display snackbar using notistack.
      enqueueSnackbar(notification.message, {
        key: notification.key,
        onClose: () => {
        },
        onExited: () => {
          // Remove this snackbar from redux store.
          dispatch(removeNotification(notification.key));
          displayed = displayed.filter(key => key !== notification.key);
        },
        variant: notification.variant
      });

      // Keep track of snackbars that we've displayed.
      displayed.push(notification.key);
    });
  }, [notifications, enqueueSnackbar, dispatch]);

  return null;
};

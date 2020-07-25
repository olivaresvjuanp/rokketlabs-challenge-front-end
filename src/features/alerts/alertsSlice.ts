import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { AlertProps } from '@material-ui/lab/Alert';

interface Alert extends Pick<AlertProps, 'action' | 'severity'> {
  key: string;
}

type AlertsState = {
  open: Alert[];
  max: number;
  queue: Alert[];
};

const initialState: AlertsState = {
  open: [],
  max: 3,
  queue: []
};

/**
 * Slice:
 * https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    /**
     * @param Alert
     */
    openAlert: (state, action: PayloadAction<Alert>) => {
    },
    closeAlert: (state, action: PayloadAction<string>) => {
    }
  }
});

export const {
  openAlert,
  closeAlert
} = alertsSlice.actions;

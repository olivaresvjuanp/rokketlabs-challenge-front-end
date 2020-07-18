import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { PaletteType } from '@material-ui/core';

type SystemState = {
  loading: boolean;

  theme: {
    palette: {
      type: PaletteType;
    };
  };
}

const initialState: SystemState = {
  loading: false,
  theme: {
    palette: {
      type: 'light'
    }
  }
};

/**
 * Slice:
 * https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setThemePaletteType: (state, action: PayloadAction<PaletteType>) => {
      state.theme.palette.type = action.payload;
    }
  }
});

export const {
  setLoading,
  setThemePaletteType
} = systemSlice.actions;

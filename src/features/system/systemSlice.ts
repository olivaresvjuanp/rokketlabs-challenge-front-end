import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { PaletteType } from '@material-ui/core';

type SystemState = {
  theme: {
    palette: {
      type: PaletteType;
    };
  };
}

const initialState: SystemState = {
  theme: {
    palette: {
      type: 'dark'
    }
  }
};

/**
 * Slice.
 *  https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setThemePaletteType: (state, action: PayloadAction<PaletteType>) => {
      state.theme.palette.type = action.payload;
    }
  }
});

export const {
  setThemePaletteType
} = systemSlice.actions;

import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { PaletteType } from '@material-ui/core';

type Loading = {
  isLoading: boolean;
  type: string;
}

type SystemState = {
  loading: Loading;

  theme: {
    palette: {
      type: PaletteType;
    };
  };
}

const initialState: SystemState = {
  loading: {
    isLoading: false,
    type: ''
  },
  theme: {
    palette: {
      type: 'dark'
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
    startLoading: (state, action: PayloadAction<string>) => {
      state.loading = {
        isLoading: true,
        type: action.payload
      };
    },
    stopLoading: state => {
      state.loading = {
        isLoading: false,
        type: ''
      };
    },
    setThemePaletteType: (state, action: PayloadAction<PaletteType>) => {
      state.theme.palette.type = action.payload;
    }
  }
});

export const {
  startLoading,
  stopLoading,
  setThemePaletteType
} = systemSlice.actions;

import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';

export interface Animal { // Animal shape.
  photoUrl: string;
  commonName: string;
  scientificName: string;
  habitat: string;
}

type AnimalsState = {
  animals: Animal[];
}

const initialState: AnimalsState = {
  animals: []
};

/**
 * Async actions.
 *  https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks
 */

// Async action to get all the animals from the DB.
const getAnimals = createAsyncThunk<
  // Return type of the payload creator.
  Animal[],
  // Types for ThunkAPI.
  {
    rejectWithValue: any // HTTP status code.
  }
>('animals/get', async thunkAPI => {
  const res = await fetch('http://localhost:3000/api/animals'); // TODO: We have to set the API URL in config.json file.
  const resJSON = await res.json();

  switch (res.status) {
    case 200:
      return resJSON as Animal[]; // Server returns a list of animals.

    case 500:
      return thunkAPI.rejectWithValue(res.status); // TODO: Handle HTTP 500 error correctly.
  }
});

/**
 * Slice.
 *  https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
    addAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = [...state.animals, action.payload];
    },
    updateAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = state.animals.map((animal: Animal): Animal => {
        return animal.commonName === action.payload.commonName ?
          action.payload :
          animal
      });
    },
    removeAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal: Animal): boolean => {
        return animal.commonName !== action.payload
      });
    }
  }
});

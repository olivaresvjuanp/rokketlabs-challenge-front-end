import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';

import { setLoading } from '../system/systemSlice';

export interface Animal { // Animal shape.
  photoUrl: string;
  commonName: string;
  scientificName: string;
  habitat: string;
}

type AnimalsListState = {
  animals: Animal[];
  count: number;
}

const initialState: AnimalsListState = {
  animals: [],
  count: 0
};

/**
 * Slice:
 * https://redux-toolkit.js.org/tutorials/intermediate-tutorial#understanding-slices
 */

export const animalsListSlice = createSlice({
  name: 'animalsList',
  initialState,
  reducers: {
    setAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
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
    deleteAnimal: (state, action: PayloadAction<string>) => {
      state.animals = state.animals.filter((animal: Animal): boolean => {
        return animal.commonName !== action.payload
      });
    }
  }
});

// Export animalsSlice actions (we will be able to use them with react-redux's useDispatch hook).
export const {
  setAnimals,
  setCount,
  addAnimal,
  updateAnimal,
  deleteAnimal
} = animalsListSlice.actions;

/**
 * Async actions:
 * https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks
 */

// Async action to get all the animals from the DB.
export const thunkGetAnimalsList = createAsyncThunk('animals/get', async (temp, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch('http://localhost:3000/api/animals'); // TODO: We have to set the API URL in config.json file.
  const resJSON = await res.json();

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(setAnimals(resJSON.animals as Animal[]));
      thunkApi.dispatch(setCount(resJSON.count as number));

    case 500:
      return thunkApi.rejectWithValue(res.status); // TODO: Handle HTTP 500 error correctly.
  }
});

// Async action to remove an animal from the DB.
export const thunkDeleteAnimal = createAsyncThunk('animal/delete', async (commonName: string, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch(`http://localhost:3000/api/animals/${commonName}`, { // TODO: We have to set the API URL in config.json file.
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  });

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(deleteAnimal(commonName));

    case 500:
      return thunkApi.rejectWithValue(res.status); // TODO: Handle HTTP 500 error correctly.
  }
});

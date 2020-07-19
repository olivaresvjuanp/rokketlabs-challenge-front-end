import {
  createSlice,
  createAsyncThunk,
  PayloadAction
} from '@reduxjs/toolkit';

import { setLoading } from '../system/systemSlice';
import config from '../../config.json';

export interface Animal { // Animal shape.
  id?: number;
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
 * ===== Slice =====
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
      state.count++; // Testing.
    },
    updateAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = state.animals.map((animal: Animal): Animal => {
        return animal.id === action.payload.id ?
          action.payload :
          animal
      });
    },
    deleteAnimal: (state, action: PayloadAction<number>) => {
      state.animals = state.animals.filter((animal: Animal): boolean => {
        return animal.id !== action.payload
      });

      state.count--; // Testing.
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
 * ===== Async actions =====
 * https://redux-toolkit.js.org/tutorials/advanced-tutorial#thinking-in-thunks
 */

/**
 * // TODO: Handle errors correctly.
 * Async action to get animals.
 * @returns between 1 and 5 animals, and a count of all animals in the DB.
 */
export const thunkGetAnimalsList = createAsyncThunk('animals/get', async (temp, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch(`${config.apiUrl}/animals`);
  const resJSON = await res.json();

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(setAnimals(resJSON.animals as Animal[]));
      thunkApi.dispatch(setCount(resJSON.count as number));

    case 500:
      return thunkApi.rejectWithValue(res.status);
  }
});

/**
 * // TODO: Handle errors correctly.
 * Async action to add an animal.
 * @param animal
 * @returns the added animal from the DB.
 */
export const thunkAddAnimal = createAsyncThunk('animal/add', async (animal: Animal, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch(`${config.apiUrl}/animals`, {
    body: JSON.stringify(animal),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  const resJSON = await res.json();

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(addAnimal(resJSON as Animal));

    case 500:
      return thunkApi.rejectWithValue(res.status);
  }
});

/**
 * // TODO: Handle errors corresctly.
 * Async action to update an animal.
 * @param animal
 * @returns // TODO
 */
export const thunkUpdateAnimal = createAsyncThunk('animal/update', async (animal: Animal, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch(`${config.apiUrl}/animals`, {
    body: JSON.stringify(animal),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  });

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(updateAnimal(animal));

    case 500:
      return thunkApi.rejectWithValue(res.status);
  }
});

/**
 * // TODO: Handle errors corresctly.
 * Async action to delete an animal.
 * @param id
 * @returns // TODO
 */
export const thunkDeleteAnimal = createAsyncThunk('animal/delete', async (id: number, thunkApi) => {
  thunkApi.dispatch(setLoading(true));

  const res = await fetch(`${config.apiUrl}/animals/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  });

  thunkApi.dispatch(setLoading(false));

  switch (res.status) {
    case 200:
      thunkApi.dispatch(deleteAnimal(id));

    case 500:
      return thunkApi.rejectWithValue(res.status);
  }
});

import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

export interface Animal { // Animal shape.
  id?: number;
  photoUrl: string;
  commonName: string;
  scientificName: string;
  habitat: string;
}

type AnimalsListState = {
  addAnimalFormErrors: string[];
  animals: Animal[];
  count: number;
}

const initialState: AnimalsListState = {
  addAnimalFormErrors: [],
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
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setAnimals: (state, action: PayloadAction<Animal[]>) => {
      state.animals = action.payload;
    },
    addAnimal: (state, action: PayloadAction<Animal>) => {
      state.animals = [...state.animals, action.payload];
      state.count++; // Testing.
    },
    setAddAnimalFormErrors: (state, action: PayloadAction<string[]>) => {
      state.addAnimalFormErrors = action.payload;
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
  setCount,
  setAnimals,
  addAnimal,
  setAddAnimalFormErrors,
  updateAnimal,
  deleteAnimal
} = animalsListSlice.actions;

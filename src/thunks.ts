import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios, { AxiosError } from 'axios';

import config from './config.json';
import { RootState } from './app/store';
import {
  Animal,
  setCount,
  setAnimals,
  addAnimal,
  setAddAnimalFormErrors,
  updateAnimal,
  deleteAnimal
} from './features/animalsList/animalsListSlice';
import { addNotification } from './features/notifications/notificationsSlice';
import {
  startLoading,
  stopLoading
} from './features/system/systemSlice';

const axiosInstance = axios.create({
  baseURL: config.apiUrl
});

const serverErrorMessage = 'Sorry, something went wrong. An error has occurred on the server.';

export const thunkGetCount = (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => {
  return async dispatch => {
    dispatch(startLoading('thunk-get-count'));

    await axiosInstance.get('/animals/get-count')
      .then(response => { dispatch(setCount(response.data.payload.count)); })
      .catch((error: AxiosError) => {
        const response = error.response;

        if (response) {
          if (response.status === 500) {
            dispatch(addNotification({
              key: 'thunk-get-count-n-e-500',
              message: serverErrorMessage,
              variant: 'error'
            }));
          }
        } else {
          dispatch(addNotification({
            key: 'thunk-get-count-n-e-u',
            message: error.message,
            variant: 'error'
          }));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };
};

export const thunkGetAnimals = (page: number): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => {
  return async dispatch => {
    dispatch(startLoading('thunk-get-animals'));

    await axiosInstance.get(`/animals/get-animals/${page}`)
      .then(response => { dispatch(setAnimals(response.data.payload.animals)); })
      .catch((error: AxiosError) => {
        const response = error.response;

        if (response) {
          switch (response.status) {
            case 400:
              dispatch(addNotification({
                key: 'thunk-get-animals-n-e-400',
                message: 'TODO: 400',
                variant: 'error'
              }));

              break;

            case 500:
              dispatch(addNotification({
                key: 'thunk-get-animals-n-e-500',
                message: serverErrorMessage,
                variant: 'error'
              }));
          }
        } else {
          dispatch(addNotification({
            key: 'thunk-get-animals-n-e-u',
            message: error.message,
            variant: 'error'
          }));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  }
};

export const thunkAddAnimal = (animal: Animal): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => {
  return async dispatch => {
    dispatch(startLoading('thunk-add-animal'));

    await axiosInstance.post('/animals', JSON.stringify(animal), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        dispatch(addAnimal(response.data.payload.animal));

        dispatch(addNotification({
          key: 'thunk-add-animal-n-s',
          message: 'Success.',
          variant: 'success'
        }));
      })
      .catch((error: AxiosError) => {
        const response = error.response;

        if (response) {
          switch (response.status) {
            case 400:
              dispatch(setAddAnimalFormErrors(response.data.payload.errors));

              dispatch(addNotification({
                key: 'thunk-add-animal-n-e-400',
                message: 'TODO: 400',
                variant: 'error'
              }));

              break;

            case 500:
              dispatch(addNotification({
                key: 'thunk-add-animal-n-e-500',
                message: serverErrorMessage,
                variant: 'error'
              }));
          }
        } else {
          dispatch(addNotification({
            key: 'thunk-add-animal-n-e-u',
            message: error.message,
            variant: 'error'
          }));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };
};

export const thunkUpdateAnimal = (animal: Animal): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async dispatch => {
    dispatch(startLoading('thunk-update-animal'));

    await axiosInstance.patch('/animals', JSON.stringify(animal), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        dispatch(updateAnimal(response.data.payload.animal));

        dispatch(addNotification({
          key: 'thunk-update-animal-n-s',
          message: 'Success.',
          variant: 'success'
        }));
      })
      .catch((error: AxiosError) => {
        const response = error.response;

        if (response) {
          switch (response.status) {
            case 400:
              //dispatch(setUpdateAnimalFormErrors(response.data.payload.errors));

              dispatch(addNotification({
                key: 'thunk-update-animal-n-e-400',
                message: 'TODO: 400',
                variant: 'error'
              }));

              break;

            case 500:
              dispatch(addNotification({
                key: 'thunk-update-animal-n-e-500',
                message: serverErrorMessage,
                variant: 'error'
              }));
          }
        } else {
          dispatch(addNotification({
            key: 'thunk-update-animal-n-e-u',
            message: error.message,
            variant: 'error'
          }));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };
};

export const thunkDeleteAnimal = (id: number): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async dispatch => {
    dispatch(startLoading('thunk-delete-animal'));

    await axiosInstance.delete(`animals/${id}`)
      .then(() => {
        dispatch(deleteAnimal(id));

        dispatch(addNotification({
          key: 'thunk-delete-animal-n-s',
          message: 'Success.',
          variant: 'success'
        }));
      })
      .catch((error: AxiosError) => {
        const response = error.response;

        if (response) {
          switch (response.status) {
            case 400:
              dispatch(addNotification({
                key: 'thunk-delete-animal-n-e-400',
                message: 'TODO: 400',
                variant: 'error'
              }));

              break;

            case 404:
              dispatch(addNotification({
                key: 'thunk-delete-animal-n-e-400',
                message: 'TODO: 400',
                variant: 'error'
              }));

              break;

            case 500:
              dispatch(addNotification({
                key: 'thunk-delete-animal-n-e-500',
                message: serverErrorMessage,
                variant: 'error'
              }));
          }
        } else {
          dispatch(addNotification({
            key: 'thunk-delete-animal-n-e-u',
            message: error.message,
            variant: 'error'
          }));
        }
      })
      .finally(() => {
        dispatch(stopLoading());
      });
  };
};

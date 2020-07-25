import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Link,
  TextField,
  Box,
  DialogActions,
  Button
} from '@material-ui/core';

import { RootState } from '../../app/store';
import { thunkAddAnimal } from '../../thunks';

interface AddAnimalDialogProps {
  openAddAnimalDialog: boolean;
  setOpenAddAnimalDialog: (open: boolean) => void;
}

export const AddAnimalDialog: React.FunctionComponent<AddAnimalDialogProps> = props => {
  const dispatch = useDispatch();

  // Default values (testing).
  const defaultPhotoUrl = 'https://rokketlabs-full-stack-challenge.s3-sa-east-1.amazonaws.com/default-animal-photo.jpg';
  const defaultCommonName = 'Default CN';
  const defaultScientificName = 'Default Scientific Name';
  const defaultHabitat = '0000000000000000';

  const [photoUrl, setPhotoUrl] = React.useState(defaultPhotoUrl);
  const [commonName, setCommonName] = React.useState(defaultCommonName);
  const [scientificName, setScientificName] = React.useState(defaultScientificName);
  const [habitat, setHabitat] = React.useState(defaultHabitat);

  const isLoading = useSelector((state: RootState) => {
    return state.system.loading.isLoading && state.system.loading.type === 'thunk-add-animal';
  });

  const errors = useSelector((state: RootState) => {
    return state.animals.addAnimalFormErrors;
  });

  return (
    <Dialog
      aria-describedby='add-animal-dialog'
      aria-labelledby='Add animal dialog'
      disableBackdropClick={isLoading}
      fullWidth
      maxWidth='xs'
      open={props.openAddAnimalDialog}
      onClose={() => {
        props.setOpenAddAnimalDialog(false);
      }}
      onExited={() => {
        setPhotoUrl(defaultPhotoUrl);
        setCommonName(defaultCommonName);
        setScientificName(defaultScientificName);
        setHabitat(defaultHabitat);
      }}
      PaperProps={{
        square: true
      }}
    >
      <DialogTitle>ADD ANIMAL</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We recommend to looking for animals here:
          {' '}
          <Link
            color='secondary'
            href='https://www.nationalgeographic.org/projects/photo-ark/explore/' target='_blank'
          >
            National Geographic Photo Ark
          </Link>
        </DialogContentText>
        <form
          id='add-animal-form'
          onSubmit={event => {
            dispatch(thunkAddAnimal({
              photoUrl,
              commonName,
              scientificName,
              habitat
            }));

            event.preventDefault();
          }}
        >
          <TextField
            autoFocus
            color='secondary'
            disabled={isLoading}
            error={errors.includes('photoUrl')}
            fullWidth
            helperText='It must be a valid URL (protocol required).'
            label='Photo URL'
            name='photo-url'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setPhotoUrl(event.target.value);
            }}
            required
            value={photoUrl}
            variant='filled'
          />
          <Box mt={2} />
          <TextField
            color='secondary'
            disabled={isLoading}
            error={errors.includes('commonName')}
            fullWidth
            helperText='It must be unique, and it must be between 1 and 32 characters.'
            inputProps={{ maxLength: 32 }}
            label='Common name'
            name='common-name'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setCommonName(event.target.value);
            }}
            required
            value={commonName}
            variant='filled'
          />
          <Box mt={2} />
          <TextField
            color='secondary'
            disabled={isLoading}
            error={errors.includes('scientificName')}
            fullWidth
            helperText='Between 1 and 32 characters.'
            inputProps={{ maxLength: 32 }}
            label='Scientific name'
            name='scientific-name'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setScientificName(event.target.value);
            }}
            required
            value={scientificName}
            variant='filled'
          />
          <Box mt={2} />
          <TextField
            color='secondary'
            disabled={isLoading}
            error={errors.includes('habitat')}
            fullWidth
            helperText='Between 16 and 1000 characters.'
            inputProps={{ maxLength: 1000 }}
            label='Habitat'
            multiline
            name='habitat'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setHabitat(event.target.value);
            }}
            required
            value={habitat}
            variant='filled'
          />
        </form>
      </DialogContent>
      <DialogActions disableSpacing>
        <Button
          color='secondary'
          disabled={isLoading}
          onClick={() => {
            props.setOpenAddAnimalDialog(false);
          }}
        >
          CANCEL
        </Button>
        <Button
          color='secondary'
          disabled={isLoading}
          form='add-animal-form'
          type='submit'
        >
          ADD
        </Button>
      </DialogActions>
    </Dialog>
  );
};

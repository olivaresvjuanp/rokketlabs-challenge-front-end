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
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';

import { thunkAddAnimal } from './animalsListSlice';
import { RootState } from '../../app/store';

const useStyles = makeStyles({
});

interface AddAnimalDialogProps {
  openAddAnimalDialog: boolean;
  setOpenAddAnimalDialog: (open: boolean) => void;
}

export const AddAnimalDialog: React.FunctionComponent<AddAnimalDialogProps> = props => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.system.loading);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [commonName, setCommonName] = React.useState('');
  const [scientificName, setScientificName] = React.useState('');
  const [habitat, setHabitat] = React.useState('');

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={props.openAddAnimalDialog}
      onClose={(event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        props.setOpenAddAnimalDialog(false);
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
          <Link href='https://www.nationalgeographic.org/projects/photo-ark/explore/'>National Geographic Photo Ark</Link>
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
            disabled={loading}
            error={false}
            fullWidth
            label='Photo URL'
            name='photo-url'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setPhotoUrl(event.target.value);
            }}
            required
            value={photoUrl}
          />
          <Box mt={2} />
          <TextField
            disabled={loading}
            error={false}
            fullWidth
            label='Common name'
            name='common-name'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setCommonName(event.target.value);
            }}
            required
            value={commonName}
          />
          <Box mt={2} />
          <TextField
            disabled={loading}
            error={false}
            fullWidth
            label='Scientific name'
            name='scientific-name'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setScientificName(event.target.value);
            }}
            required
            value={scientificName}
          />
          <Box mt={2} />
          <TextField
            disabled={loading}
            error={false}
            fullWidth
            label='Habitat'
            multiline
            name='habitat'
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
              setHabitat(event.target.value);
            }}
            required
            rows={5}
            value={habitat}
          />
        </form>
      </DialogContent>
      <DialogActions disableSpacing>
        <Button
          color='primary'
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            props.setOpenAddAnimalDialog(false);
          }}
        >
          CANCEL
        </Button>
        <Button
          color='primary'
          form='add-animal-form'
          type='submit'
        >
          ADD
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import React from 'react';
import {
  Link
} from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { Animal } from '../animalsList/animalsListSlice';

interface AnimalDetailsProps extends Animal {
}

export const AnimalDetails: React.FunctionComponent<AnimalDetailsProps> = props => {
  return (
    <React.Fragment>
      <Typography>ID: {props.id}</Typography>
      <Typography>Common name: {props.commonName}</Typography>
      <Typography>Scientific name: {props.scientificName}</Typography>
      <Typography>Habitat: {props.habitat}</Typography>
      <Link to='/'>
        Back
      </Link>
    </React.Fragment>
  );
};

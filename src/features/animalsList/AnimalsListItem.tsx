import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Grow,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

import { Animal } from './animalsListSlice';
import { thunkDeleteAnimal } from '../../thunks';

const useStyles = makeStyles({
  card: {
    width: 320
  },
  deleteButton: {
    color: red[500]
  }
});

const FunctionComponent: React.FunctionComponent<Animal> = props => {
  console.debug(`Rendering AnimasListItem (props.id: ${props.id})`);

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Grid item>
      <Grow in={true}>
        <Card className={classes.card} elevation={2} square>
          <CardActionArea
            onClick={() => {
              history.push(`/animal-details/${props.id}`);
            }}
          >
            <CardMedia
              alt={props.commonName}
              component='img'
              image={props.photoUrl}
              onDragStart={(event: React.DragEvent<HTMLImageElement>): void => {
                event.preventDefault();
              }}
              title={props.commonName}
            />
          </CardActionArea>
          <CardContent>
            <Typography gutterBottom>{props.commonName}</Typography>
            <Typography color='textSecondary' noWrap variant='body2'>{props.scientificName}</Typography>
          </CardContent>
          <CardActions>
            <Button
              color='secondary'
              size='small'
            >
              VIEW DETAILS
            </Button>
            <Button
              className={classes.deleteButton}
              onClick={() => {
                dispatch(thunkDeleteAnimal(props.id as number));
              }}
              size='small'
            >
              DELETE
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </Grid>
  );
};

export const AnimalsListItem = React.memo(FunctionComponent, (prevProps, nextProps) => {
  return prevProps.commonName === nextProps.commonName;
});

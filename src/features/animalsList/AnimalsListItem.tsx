import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
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
import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';

import {
  Animal,
  thunkDeleteAnimal
} from './animalsListSlice';
import { RootState } from '../../app/store';

const useStyles = makeStyles({
  cardMedia: {
    width: 320
  },
  cardContent: {
    //height: (240 / 2) + (60 - 46)
  }
});

export const AnimalsListItem: React.FunctionComponent<Animal> = props => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [elevation, setElevation] = React.useState(2);

  return (
    <Grow
      in={useSelector((state: RootState) => !state.system.loading)}
      style={{
        transformOrigin: '0 0 0'
      }}
      {...(useSelector((state: RootState) => !state.system.loading) ? { timeout: 1000 } : {})}
    >
      <Grid item>
        <Card elevation={elevation} square>
          <CardActionArea
            //onClick={}
            onMouseEnter={() => setElevation(4)}
            onMouseLeave={() => setElevation(2)}
          >
            <CardMedia
              className={classes.cardMedia}
              component='img'
              image='https://rokketlabs-full-stack-challenge.s3-sa-east-1.amazonaws.com/1.jpg'
              title={props.commonName}
            />
          </CardActionArea>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom>{props.commonName}</Typography>
            <Typography color='textSecondary' noWrap variant='body2'>{props.habitat}</Typography>
          </CardContent>
          <CardActions>
            <Button
              color='primary'
              //onClick={}
              onMouseEnter={() => setElevation(4)}
              onMouseLeave={() => setElevation(2)}
              size='small'
            >
              View
          </Button>
            <Button
              color='primary'
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                dispatch(thunkDeleteAnimal(props.commonName));
              }}
              onMouseEnter={() => setElevation(4)}
              onMouseLeave={() => setElevation(2)}
              size='small'
            >
              Delete
          </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grow>
  );
};

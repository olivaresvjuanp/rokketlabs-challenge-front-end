import React from 'react';
import {
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

import { Animal } from './animalsListSlice';

const useStyles = makeStyles({
  card: {
    width: 240
  },
  cardMedia: {
    height: 240,
  },
  cardContent: {
    height: (240 / 2) + (60 - 46)
  }
});

export const AnimalsListItem: React.FunctionComponent<Animal> = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [elevation, setElevation] = React.useState(2);

  return (
    <Grid item>
      <Card className={classes.card} elevation={elevation} square>
        <CardActionArea
          //onClick={}
          onMouseEnter={() => setElevation(4)}
          onMouseLeave={() => setElevation(2)}
        >
          <CardMedia
            className={classes.cardMedia}
            image='/default-avatar.jpg'
            title='Example avatar (Chris Redfield from Resident Evil 7)'
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
            //onClick={}
            onMouseEnter={() => setElevation(4)}
            onMouseLeave={() => setElevation(2)}
            size='small'
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

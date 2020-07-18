import React from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import { Fab } from '@material-ui/core';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';

import { RootState } from '../../app/store';
import { getAnimalsList } from './animalsListSlice';
import { setLoading } from '../system/systemSlice';

const styles = (theme: Theme) => createStyles({
  fab: {
    bottom: theme.spacing(2),
    position: 'fixed',
    right: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
});

// https://material-ui.com/guides/typescript/#augmenting-your-props-using-withstyles
interface AnimalsProps extends PropsFromRedux, WithStyles<typeof styles> {
}

class AnimalsList extends React.Component<AnimalsProps> {
  componentDidMount() {
    this.props.setLoading(true);

    this.props.getAnimalsList()
      .then(animals => {
        this.props.setLoading(false);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Fab className={classes.fab} color='primary' variant='extended'>
          <AddIcon className={classes.extendedIcon} />
          ADD ANIMAL
        </Fab>
      </React.Fragment>
    );
  }
}

/**
 * "Because types can be defined in any order,
 * you can still declare your component before declaring the connector if you want.":
 * https://react-redux.js.org/using-react-redux/static-typing#typing-the-connect-higher-order-component
 */

// Map state to props.
const mapState = (state: RootState) => ({});

// Map dispatch to props.
const mapDispatch = {
  getAnimalsList,
  setLoading
};

const connector = connect(
  mapState,
  mapDispatch
);

// Inferring the connected props automatically.
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(
  withStyles(styles, { /* withTheme: true */ })(AnimalsList)
);

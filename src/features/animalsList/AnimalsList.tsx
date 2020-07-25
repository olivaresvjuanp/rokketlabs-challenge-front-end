import React from 'react';
import {
  connect,
  ConnectedProps
} from 'react-redux';
import {
  Paper,
  Fab,
  Box,
  Grid
} from '@material-ui/core';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  Pagination,
  Skeleton
} from '@material-ui/lab';
import { Add as AddIcon } from '@material-ui/icons';

import { AddAnimalDialog } from './AddAnimalDialog';
import { AnimalsListItem } from './AnimalsListItem';
import { RootState } from '../../app/store';
import {
  thunkGetCount,
  thunkGetAnimals
} from '../../thunks';

const styles = (theme: Theme) => createStyles({
  paper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(1),
    width: 'fit-content'
  },
  pagination: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  fab: {
    bottom: theme.spacing(2),
    position: 'fixed',
    right: theme.spacing(2)
  }
});

// https://material-ui.com/guides/typescript/#augmenting-your-props-using-withstyles
interface AnimalsListProps extends PropsFromRedux, WithStyles<typeof styles> {
}

interface AnimalsListOwnState {
  openAddAnimalDialog: boolean;
  page: number;
}

class AnimalsList extends React.Component<AnimalsListProps, AnimalsListOwnState> {
  constructor(props: AnimalsListProps) {
    super(props);

    this.state = {
      openAddAnimalDialog: false,
      page: 1
    };

    this.setOpenAddAnimalDialog = this.setOpenAddAnimalDialog.bind(this);
  }

  componentDidMount() {
    console.debug('AnimalsList => componentDidMount');

    this.props.thunkGetCount();
    this.props.thunkGetAnimals(this.state.page);
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Paper
          className={classes.paper}
          elevation={2}
          square
        >
          <Pagination
            className={classes.pagination}
            color='primary'
            count={Math.ceil(this.props.count / 5)}
            onChange={(event: React.ChangeEvent<unknown>, page: number) => {
              this.setState({
                page
              });

              this.props.thunkGetAnimals(page);
            }}
            page={this.state.page}
            showFirstButton
            showLastButton
          />
        </Paper>
        <Box mt={2} />
        <Grid
          container
          justify='center'
          spacing={2}
        >
          {
            this.props.animals.map(animal => <AnimalsListItem key={animal.id} {...animal} />)
          }
        </Grid>
        <Fab
          className={classes.fab}
          color='primary'
          onClick={() => {
            this.setOpenAddAnimalDialog(true);
          }}
        >
          <AddIcon />
        </Fab>
        <AddAnimalDialog
          openAddAnimalDialog={this.state.openAddAnimalDialog}
          setOpenAddAnimalDialog={this.setOpenAddAnimalDialog}
        />
      </React.Fragment>
    );
  }

  setOpenAddAnimalDialog(open: boolean) {
    this.setState({
      openAddAnimalDialog: open
    });
  }
}

/**
 * "Because types can be defined in any order,
 * you can still declare your component before declaring the connector if you want.":
 * https://react-redux.js.org/using-react-redux/static-typing#typing-the-connect-higher-order-component
 */

// Map state to props.
const mapState = (state: RootState) => ({
  animals: state.animals.animals,
  count: state.animals.count,
  loading: state.system.loading
});

// Map dispatch to props.
const mapDispatch = {
  thunkGetCount,
  thunkGetAnimals
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

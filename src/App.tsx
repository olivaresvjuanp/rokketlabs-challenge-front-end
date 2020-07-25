import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  Container
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles';
import Particles from 'react-tsparticles';

import 'fontsource-roboto';

import { RootState } from './app/store';
import { Alerts } from './features/alerts/Alerts';
import AnimalsList from './features/animalsList/AnimalsList';
import { Header } from './features/header/Header';

const useStyles = makeStyles(theme => ({
  particles: {
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: theme.spacing(6) + 4,
    zIndex: -1
  },
  container: {
    marginTop: theme.spacing(6) + 4,
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2)
  }
}));

export const App: React.FunctionComponent = () => {
  const themePaletteType = useSelector((state: RootState) => state.system.theme.palette.type);

  // Custom Material-UI theme.
  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          // ...
        }
      },
      MuiFilledInput: {
        root: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }
      }
    },
    palette: {
      primary: {
        main: deepPurple[500]
      },
      secondary: {
        main: deepPurple[themePaletteType === 'light' ? 700 : 300]
      },
      type: themePaletteType
    }
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/* Kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Alerts />
      <Header />
      <Particles
        className={classes.particles}
        options={{
          background: {
            color: {
              value: 'transparent',
            }
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              onClick: {
                enable: false,
                mode: 'push'
              },
              onHover: {
                enable: false,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
              },
              push: {
                quantity: 4
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
            },
          },
          particles: {
            color: {
              value: theme.palette.primary.main
            },
            links: {
              color: theme.palette.common[themePaletteType === 'light' ? 'black' : 'white'],
              distance: 150,
              enable: true,
              opacity: 0.25,
              width: 1
            },
            collisions: {
              enable: true
            },
            move: {
              direction: 'none',
              enable: true,
              outMode: 'bounce',
              random: false,
              speed: 6,
              straight: false
            },
            number: {
              density: {
                enable: true,
                value_area: 800
              },
              value: 80
            },
            opacity: {
              value: 1
            },
            shape: {
              type: 'circle'
            },
            size: {
              random: true,
              value: 2.5
            }
          },
          detectRetina: true
        }}
      />
      <Container className={classes.container} maxWidth='xl'>
        <Router>
          <Switch>
            <Route exact path='/'>
              <AnimalsList />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};

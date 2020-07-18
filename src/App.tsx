import React from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  LinearProgress,
  Container
} from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Particles from 'react-tsparticles';

import 'fontsource-roboto';

import { RootState } from './app/store';
import { Header } from './features/header/Header';
import AnimalsList from './features/animalsList/AnimalsList';

const useStyles = makeStyles({
  linearProgress: {
    position: 'fixed',
    top: 0,
    width: '100%'
  },
  particles: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 48
  }
});

export const App: React.FunctionComponent = () => {
  // Custom Material-UI theme.
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: deepPurple[500]
      },
      type: useSelector((state: RootState) => state.system.theme.palette.type)
    }
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/* Kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {useSelector((state: RootState) => state.system.loading) && <LinearProgress className={classes.linearProgress} />}
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
              color: theme.palette.common[useSelector((state: RootState) =>
                state.system.theme.palette.type) === 'light' ? 'black' : 'white'],
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
      <Container maxWidth='xl'>
        <AnimalsList />
      </Container>
    </ThemeProvider>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import {
  CssBaseline,
  Container
} from '@material-ui/core';
import {
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles';

import 'fontsource-roboto';

import { RootState } from './app/store';
import { Header } from './features/header/Header';

export const App: React.FunctionComponent = () => {
  // Custom Material-UI theme.
  const theme = createMuiTheme({
    palette: {
      type: useSelector((state: RootState) => state.system.theme.palette.type)
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {/* Kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Header />
      <Container maxWidth='xl'>
        <p></p>
      </Container>
    </ThemeProvider>
  );
};

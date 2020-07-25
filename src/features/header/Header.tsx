import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  AppBar,
  Box,
  LinearProgress,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
  GitHub as GitHubIcon
} from '@material-ui/icons';

import { RootState } from '../../app/store';
import { setThemePaletteType } from '../system/systemSlice';

const useStyles = makeStyles(theme => ({
  linearProgress: {
    zIndex: theme.zIndex.modal + 1
  },
  title: {
    flexGrow: 1
  }
}));

export const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar
      color='inherit'
      elevation={4}
      position='fixed'
    >
      <Box height={4}>
        {useSelector((state: RootState) => state.system.loading.isLoading) && <LinearProgress className={classes.linearProgress} />}
      </Box>
      <Toolbar variant='dense'>
        <Typography className={classes.title} variant='h6'>
          Rokketlabs Full Stack Challenge
        </Typography>
        {useSelector((state: RootState) => state.system.theme.palette.type) === 'light' &&
          <IconButton
            onClick={() => {
              dispatch(setThemePaletteType('dark'));
            }}
          >
            <Brightness4Icon />
          </IconButton>
        }
        {useSelector((state: RootState) => state.system.theme.palette.type) === 'dark' &&
          <IconButton
            onClick={() => {
              dispatch(setThemePaletteType('light'));
            }}
          >
            <Brightness7Icon />
          </IconButton>
        }
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <GitHubIcon />
        </IconButton>
        <Menu
          id='github-button-menu'
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'center'
          }}
          getContentAnchorEl={null}
          keepMounted
          onClose={() => {
            setAnchorEl(null);
          }}
          open={Boolean(anchorEl)}
          PaperProps={{
            square: true
          }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'top'
          }}
        >
          <MenuItem
            onClick={() => {
              window.open('https://github.com/olivaresvjuanp/rokketlabs-challenge-back-end', '_blank');
            }}
          >
            View back-end repository
          </MenuItem>
          <MenuItem
            onClick={() => {
              window.open('https://github.com/olivaresvjuanp/rokketlabs-challenge-front-end', '_blank');
            }}
          >
            View front-end repository
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

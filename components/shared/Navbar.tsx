/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { signOut } from 'next-auth/client';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

interface Props {
  authenticated: boolean;
}

export const Navbar = (props: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Container fixed>
            <Toolbar>
              <Typography className={classes.title} variant="h6">
                <Link href="/">
                  <a>COVID Bed</a>
                </Link>
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                {!props.authenticated && (
                  <div>
                    <Link href="/verifyUser">
                      <Button color="inherit">
                        <a>Join Us</a>
                      </Button>
                    </Link>
                  </div>
                )}
                {props.authenticated && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <Link href="/auth/profile">
                        <MenuItem>
                          <a>Profile</a>
                        </MenuItem>
                      </Link>
                      <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                    </Menu>
                  </div>
                )}
                <Divider orientation="vertical" flexItem />
                <div>
                  <Link href="/hospitals/all">
                    <Button color="inherit">
                      <a>Browse</a>
                    </Button>
                  </Link>
                </div>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

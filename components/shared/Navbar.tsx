/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import parseCookies from '../../src/actions/parse.cookies';

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
const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 2px',
    },
  })
)(Badge);

interface Props {
  authenticated: boolean;
  cookies?: any;
}

export const Navbar = (props: Props) => {
  const { cookies } = props;
  const [reserveBedCookie, setReserveBedCookie] = useState(null);
  useEffect(() => {
    if (cookies.reserveBed) {
      setReserveBedCookie(JSON.parse(cookies.reserveBed.toString()));
    } else {
      return;
    }
  }, [cookies, cookies.reserveBed]);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElBadge, setAnchorElBadge] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const openBadge = Boolean(anchorElBadge);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuBadge = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElBadge(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseBadge = () => {
    setAnchorElBadge(null);
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
                {reserveBedCookie && (
                  <>
                    <Divider orientation="vertical" flexItem />
                    <div>
                      <IconButton
                        onClick={handleMenuBadge}
                        aria-label="bed"
                        aria-controls="menu-appbar-badge"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <StyledBadge badgeContent={1} color="secondary">
                          <Icon style={{ color: 'white' }} className={`fas fa-procedures`} />
                        </StyledBadge>
                      </IconButton>
                      <Menu
                        id="menu-appbar-badge"
                        anchorEl={anchorElBadge}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={openBadge}
                        onClose={handleCloseBadge}
                      >
                        <Box
                          p={2}
                          style={{ width: '100%', height: '20%' }}
                          display="flex"
                          flexDirection="column"
                          alignItems="flex-start"
                          justifyContent="flex-start"
                        >
                          <Typography variant="subtitle2">
                            Patient ID: {reserveBedCookie && reserveBedCookie.patientGenerateID}
                          </Typography>
                          <Divider style={{ width: '100%' }} />
                          <Typography variant="h6">
                            Hospital Name is{' '}
                            <Typography color="secondary" variant="h6" component="span">
                              <Link href={`/hospital/${reserveBedCookie && reserveBedCookie.hospitalDetails.id}`}>
                                <a>{reserveBedCookie && reserveBedCookie.hospitalName}</a>
                              </Link>
                            </Typography>
                          </Typography>
                          <Divider style={{ width: '100%' }} />
                          <Typography variant="h6">
                            Arrival Time of Patient is{' '}
                            <Typography color="secondary" variant="h6" component="span">
                              {reserveBedCookie && reserveBedCookie.arrivalTime}
                            </Typography>
                          </Typography>
                          <Divider style={{ width: '100%' }} />
                          <Typography variant="h6">Note: </Typography>
                          <Typography variant="overline" gutterBottom>
                            <ul>
                              <li>Ticket will be expire after your arrival time.</li>
                              <li>Another ticket can be create after expiry of current ticket.</li>
                            </ul>
                          </Typography>
                        </Box>
                      </Menu>
                    </div>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

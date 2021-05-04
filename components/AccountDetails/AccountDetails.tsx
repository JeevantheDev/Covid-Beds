/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    cardAvatar: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
      display: 'grid',
      placeItems: 'center',
    },
    cardAvatarImg: {
      width: '70%',
      height: '80%',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    cardDetails: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    boxDetailsContainer: {
      height: '100%',
      marginRight: theme.spacing(5),
      marginLeft: theme.spacing(5),
      marginTop: theme.spacing(3),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
      },
    },
    boxDetailsText: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        marginLeft: theme.spacing(0),
      },
    },
    boxDetailsTextSpanOne: {
      fontWeight: 'bold',
      marginRight: theme.spacing(2),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        marginRight: theme.spacing(0),
      },
    },
    boxDetailsTextSpanTwo: {
      marginLeft: theme.spacing(5),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

interface IuserProps {
  userDetails: any;
  loading: boolean;
}

export const AccountDetails: React.FC<IuserProps> = ({ userDetails, loading }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardAvatar} variant="outlined">
          {userDetails && !loading && <img src={userDetails.image} className={classes.cardAvatarImg} />}
          {(userDetails === null || loading) && <Skeleton variant="circle" width={200} height={200} />}
        </Paper>
      </Grid>
      <Grid item xs={12} md={9} sm={6}>
        <Paper className={classes.cardDetails} variant="outlined">
          <Box className={classes.boxDetailsContainer}>
            {userDetails && !loading && (
              <>
                <Typography style={{ fontWeight: 'bold' }} color="primary" variant="h4" gutterBottom>
                  Personal Details
                </Typography>
                <Divider />
              </>
            )}
            {(userDetails === null || loading) && <Skeleton height={40} variant="text" />}
            <Box className={classes.boxDetailsText}>
              {userDetails && !loading && (
                <Typography variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Name:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{userDetails.name}</span>
                </Typography>
              )}
              {userDetails && !loading && (
                <Typography noWrap={true} variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Email:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{userDetails.email}</span>
                </Typography>
              )}
              {userDetails && !loading && (
                <Typography variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Joined:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{moment(userDetails.createdAt).format('LLLL')}</span>
                </Typography>
              )}
              {(userDetails === null || loading) &&
                [1, 2, 3].map((n: number) => <Skeleton key={n} height={40} variant="text" />)}
            </Box>
          </Box>
        </Paper>
      </Grid>
    </>
  );
};

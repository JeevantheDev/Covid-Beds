/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IcreateHospital } from '../../src/entity/reqParam';
import Icon from '@material-ui/core/Icon';
import { HospitalMapBox } from '../HospitalMapBox/HospitalMapBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    customChip: {
      backgroundColor: theme.palette.primary.main,
      padding: theme.spacing(0.6),
      marginRight: theme.spacing(0.6),
      color: '#fff',
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: 5,
    },
    mapContainer: {
      padding: theme.spacing(0.5),
      height: '100%',
    },
  })
);

type Props = {
  hospitalDetails: IcreateHospital;
};

export const HospitalDetailsLower = ({ hospitalDetails }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={12}>
          <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="flex-start">
            <Typography
              color="textPrimary"
              style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
              variant="h3"
              component="span"
            >
              Hospital Info
            </Typography>
            <Divider style={{ width: '90%' }} />
            <Box p={3} display="flex" alignItems="center">
              <Icon color="secondary" className="fas fa-map-marked-alt fa-2x" />
              <Typography style={{ marginLeft: '10px' }} variant="subtitle1" component="span">
                {hospitalDetails.locationFormattedAddress}
              </Typography>
            </Box>
            <Box px={3} display="flex" alignItems="center">
              {[
                hospitalDetails.locationCity,
                hospitalDetails.locationState,
                hospitalDetails.locationCountryCode,
                hospitalDetails.locationZipcode,
              ].map((value: any) => {
                return (
                  <span key={value} className={classes.customChip}>
                    {value}
                  </span>
                );
              })}
            </Box>
            <Box p={3} display="flex" alignItems="center">
              <Icon color="secondary" className="fas fa-at fa-2x" />
              <Typography style={{ marginLeft: '10px' }} variant="subtitle1" component="span">
                {hospitalDetails.hospitalEmail}
              </Typography>
            </Box>
            <Box px={3} display="flex" alignItems="center">
              <Icon color="secondary" className="fas fa-phone-square-alt fa-2x" />
              <Typography style={{ marginLeft: '10px' }} variant="subtitle1" component="span">
                {hospitalDetails.hospitalContactNo}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <Box borderColor="primary.main" border={2} className={classes.mapContainer}>
            <HospitalMapBox hospitalDatas={hospitalDetails} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IcreateHospital } from '../../src/entity/reqParam';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    upperContainer: {
      width: '100% !important',
      height: '50vh !important',
    },
    overlay: {
      position: 'absolute',
      height: '50vh',
      top: '64px',
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    chip: {
      backgroundColor: '#28A745',
      padding: theme.spacing(0.6),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: '#fff',
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: 5,
    },
    hospitalListContainer: {
      margin: theme.spacing(0.5),
      width: '100%',
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: '100%',
      },
    },
    hospitalName: {
      fontWeight: 'bold',
      color: theme.palette.primary.light,
    },
    circleImage: {
      borderRadius: theme.spacing(50),
    },
    gridContainer: {
      margin: theme.spacing(0.5),
      width: '100%',
      height: theme.spacing(50),
    },
  })
);

type Props = {
  hospitalDetails: IcreateHospital;
};

export const HospitalDetailsUpper = ({ hospitalDetails }: Props) => {
  const classes = useStyles();
  const [backgroundImage] = useState(hospitalDetails.hospitalImage);

  return (
    <>
      <Box
        style={{
          background: `${
            backgroundImage.includes('public/uploads/')
              ? `url(/uploads/${
                  hospitalDetails.hospitalImage.split('public/uploads/')[1]
                }) no-repeat center center/cover`
              : `url(${backgroundImage}) no-repeat center center/cover`
          } `,
        }}
        className={classes.upperContainer}
      >
        <div className={classes.overlay}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={1} md={6}></Grid>
              <Grid item xs={6} md={6} sm={12}>
                <Box
                  style={{ height: '50vh', width: '100%' }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography className={classes.hospitalName} variant="h3">
                    {hospitalDetails.nameHospital}
                  </Typography>
                  <Divider style={{ width: '70%' }} />
                  <span className={classes.chip}>{hospitalDetails.hospitalType}</span>
                  {/* <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton> */}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Box>
    </>
  );
};

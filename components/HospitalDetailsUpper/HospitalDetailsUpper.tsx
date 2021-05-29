/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IcreateHospital, IcreateReserveBed } from '../../src/entity/reqParam';
import AddIcon from '@material-ui/icons/Add';
import { HospitalReserveBedForm } from '../modal/HospitalReserveBedForm/HospitalReserveBedForm';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import isIncognito from '../../src/util/detectIncognito';

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
      [theme.breakpoints.down('md')]: {
        top: '64px !important',
      },
      [theme.breakpoints.down('sm')]: {
        top: '55px !important',
      },
    },
    chip: {
      backgroundColor: '#28A745',
      padding: theme.spacing(0.6),
      marginLeft: theme.spacing(2),
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
  cookies: any;
};

export const HospitalDetailsUpper = ({ hospitalDetails, cookies }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const [cookie, setCookie] = useCookies(['reserveBed']);
  const [isBrowerPrivate, setIsBrowserPrivate] = useState<boolean>(false);
  const [backgroundImage] = useState(hospitalDetails.hospitalImage);
  const [reserveFormOpen, setReserveFormOpen] = useState<boolean>(false);
  const [reserveBedData, setReserveBedData] = useState<IcreateReserveBed>({
    hospitalDetails: hospitalDetails,
    hospitalName: hospitalDetails.nameHospital,
    userPhoneNumber: '',
    arrivalTime: '',
    bedReserve: 1,
    bedExpires: false,
  });

  useEffect(() => {
    isIncognito(function (itIs) {
      if (itIs) {
        setIsBrowserPrivate(true);
      } else {
        setIsBrowserPrivate(false);
      }
    });
  }, []);

  const handleOpenReserveForm = () => {
    if (!isBrowerPrivate) {
      router.push(`/otpVerify`);
    } else {
      return;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('otpSuccessUser')) {
      setReserveBedData({
        ...reserveBedData,
        userPhoneNumber: JSON.parse(localStorage.getItem('otpSuccessUser')).identifier,
        patientGenerateID: JSON.parse(localStorage.getItem('otpSuccessUser')).user_id,
      });
      setReserveFormOpen(true);
      localStorage.removeItem('otpSuccessUser');
    } else {
      return;
    }
  }, []);

  const handleSubmitReserveBedForm = (values: IcreateReserveBed) => {
    setCookie('reserveBed', JSON.stringify(values), {
      path: '/',
      maxAge: 3600, // Expires after 1hr
      sameSite: true,
    });
    handleClose();
  };

  const handleClose = () => {
    setReserveBedData({
      hospitalDetails: hospitalDetails,
      hospitalName: hospitalDetails.nameHospital,
      userPhoneNumber: '',
      arrivalTime: '',
      bedReserve: 1,
      bedExpires: false,
    });
    setReserveFormOpen(false);
  };

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
              <Grid item xs={12} md={6} sm={12}>
                <Box
                  style={{ height: '50vh', width: '100%' }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography className={classes.hospitalName} variant="h3">
                    {hospitalDetails.nameHospital}
                    <span className={classes.chip}>{hospitalDetails.hospitalType}</span>
                  </Typography>
                  <Divider style={{ width: '60%' }} />
                  <Button
                    disabled={cookie.reserveBed && !cookie.reserveBed.bedExpires ? true : false}
                    onClick={(e: React.SyntheticEvent) => handleOpenReserveForm()}
                    style={{ marginTop: 15 }}
                    size="large"
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                  >
                    {cookie.reserveBed && !cookie.reserveBed.bedExpires ? 'Try After 1hr' : 'Reserve a Bed'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Box>
      <HospitalReserveBedForm
        open={reserveFormOpen}
        initialFormData={reserveBedData}
        handleSubmitForm={handleSubmitReserveBedForm}
        handleClose={handleClose}
      />
    </>
  );
};

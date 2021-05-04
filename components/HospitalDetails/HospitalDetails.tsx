/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Divider, Typography, Input } from '@material-ui/core';
import { HospitalForm } from '../modal/HospitalForm';
import { HospitalBedsForm } from '../modal/HospitalBedsForm';
import axios from 'axios';
import {
  IcreateHospital,
  IcreateHospitalBeds,
  IcreateHospitalBedsInitial,
  IcreateHospitalInitial,
} from '../../src/entity/reqParam';
import moment from 'moment';
import { useCreateHospital, useCreateHospitalBeds } from '../../src/actions/hospital';
import { HOSPITAL_DEFAULT } from '../../src/entity/constant';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHospitalBed: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
    cardHospitalDetails: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
      overflowY: 'scroll',
    },
    cardHospitalImage: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
    },
    inputText: {
      marginTop: theme.spacing(3),
      textAlign: 'center',
      border: 'none',
      outline: 'none',
      fontSize: '60px',
      width: '100%',
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

interface IHospitalProps {
  userDetails: any;
  loading: boolean;
}

export const HospitalDetails: React.FC<IHospitalProps> = ({ userDetails, loading }) => {
  const classes = useStyles();

  const [openHospitalModal, setOpenHospitalModal] = useState(false);
  const [openBedsModal, setOpenBedsModal] = useState(false);

  const [initialHospitalFormData, setInitialHospitalFormData] = useState<IcreateHospitalInitial>({
    nameHospital: 'xyz',
    addressHospital: 'Kushabhadra Campus,KIIT Road,Bhubaneswar,Odisha,751024',
    hospitalType: 'PVT',
    hospitalEmail: 'xyz@gmail.com',
    hospitalContactNo: '7788992255',
  });

  const [initialHospitalBedsFormData, setInitialHospitalBedsFormData] = useState<IcreateHospitalBedsInitial>({
    hospitalId: 0,
    hospitalName: '',
    totalBeds: 0,
    currentBeds: 0,
  });

  useEffect(() => {
    if (
      !loading &&
      userDetails !== null &&
      userDetails.Hospital.length > 0 &&
      userDetails.Hospital[0].HospitalBeds.length === 0
    ) {
      setInitialHospitalBedsFormData({
        ...initialHospitalBedsFormData,
        hospitalId: userDetails.Hospital[0].id,
        hospitalName: userDetails.Hospital[0].nameHospital,
      });
      return;
    }
  }, [loading, userDetails]);

  const [createHospital, { loading: loadingHospitalFormData }]: any = useCreateHospital();
  const [createHospitalBeds, { loading: loadingHospitalBedsFormData }]: any = useCreateHospitalBeds();

  const handleSubmitHospital = async (values: IcreateHospitalInitial) => {
    const { data } = await axios.get(`/api/map/${values.addressHospital.split(',').join(' ')}`);
    if (data && data.length > 0) {
      const formData: IcreateHospital = {
        userId: userDetails.id,
        nameHospital: values.nameHospital,
        locationType: HOSPITAL_DEFAULT.POINT,
        locationCoordinates: [data[0].latitude, data[0].longitude],
        locationAddress: values.addressHospital,
        locationFormattedAddress: data[0].formattedAddress,
        locationCity: data[0].city,
        locationState: data[0].stateCode,
        locationZipcode: data[0].zipcode,
        locationCountryCode: data[0].countryCode,
        hospitalType: values.hospitalType,
        hospitalEmail: values.hospitalEmail,
        hospitalContactNo: values.hospitalContactNo,
        hospitalImage: HOSPITAL_DEFAULT.IMAGE,
      };
      const { createdHospital } = await createHospital(formData);
      setInitialHospitalBedsFormData({
        ...initialHospitalBedsFormData,
        hospitalId: createdHospital.id,
        hospitalName: createdHospital.nameHospital,
      });
    }
  };

  const handleSubmitHospitalBeds = async (values: IcreateHospitalBedsInitial) => {
    const formData: IcreateHospitalBeds = {
      hospitalId: initialHospitalBedsFormData.hospitalId,
      totalBeds: values.totalBeds,
      currentBeds: values.currentBeds,
    };

    const { createdHospitalBeds } = await createHospitalBeds(formData);
    console.log(createdHospitalBeds);
  };

  const handleClickOpenBedsForm = () => {
    setOpenBedsModal(true);
  };
  const handleClickOpenHospitalForm = () => {
    setOpenHospitalModal(true);
  };
  const handleClose = () => {
    setOpenBedsModal(false);
    setOpenHospitalModal(false);
    setInitialHospitalFormData({
      nameHospital: '',
      addressHospital: '',
      hospitalType: '',
      hospitalEmail: '',
      hospitalContactNo: '',
    });
    setInitialHospitalBedsFormData({ hospitalId: 0, hospitalName: '', totalBeds: 0, currentBeds: 0 });
  };
  return (
    <>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardHospitalBed} variant="outlined">
          <Box
            style={{ height: '100%' }}
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Icon color="secondary" className="fas fa-procedures fa-7x" />
            {!loading &&
              userDetails !== null &&
              userDetails.Hospital.length > 0 &&
              userDetails.Hospital[0].HospitalBeds &&
              userDetails.Hospital[0].HospitalBeds.length > 0 && (
                <Box display="flex">
                  <Input
                    type="text"
                    disabled
                    value={`${userDetails.Hospital[0].HospitalBeds[0].totalBeds}/`}
                    className={classes.inputText}
                  />
                  <Input
                    color="primary"
                    type="number"
                    value={userDetails.Hospital[0].HospitalBeds[0].currentBeds}
                    className={classes.inputText}
                  />
                </Box>
              )}
            {!loading &&
              userDetails !== null &&
              userDetails.Hospital.length > 0 &&
              userDetails.Hospital[0].HospitalBeds &&
              userDetails.Hospital[0].HospitalBeds.length === 0 && (
                <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                  <IconButton onClick={handleClickOpenBedsForm} color="primary">
                    <Icon className="fas fa-plus" />
                  </IconButton>
                  <Typography variant="caption" gutterBottom>
                    Add Total Beds
                  </Typography>
                  <HospitalBedsForm
                    initialFormData={initialHospitalBedsFormData}
                    loading={loadingHospitalBedsFormData}
                    handleSubmitForm={handleSubmitHospitalBeds}
                    open={openBedsModal}
                    handleClose={handleClose}
                  />
                </Box>
              )}
            {!loading && userDetails !== null && userDetails.Hospital.length === 0 && (
              <input type="number" disabled value={0} className={classes.inputText} />
            )}
            {(loading || userDetails === null) && <Skeleton height={80} width={200} variant="text" />}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} sm={6}>
        <Paper className={classes.cardHospitalDetails} variant="outlined">
          {!loading && userDetails !== null && userDetails.Hospital.length === 0 && (
            <Box style={{ height: '100%' }} display="flex" justifyContent="center" alignItems="center">
              <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                <IconButton onClick={handleClickOpenHospitalForm} color="primary">
                  <Icon className="fas fa-plus" />
                </IconButton>
                <Typography variant="caption" gutterBottom>
                  Add a Hospital
                </Typography>
                <HospitalForm
                  initialFormData={initialHospitalFormData}
                  loading={loadingHospitalFormData}
                  handleSubmitForm={handleSubmitHospital}
                  open={openHospitalModal}
                  handleClose={handleClose}
                />
              </Box>
            </Box>
          )}
          <Box className={classes.boxDetailsContainer}>
            {userDetails && !loading && (
              <>
                <Typography style={{ fontWeight: 'bold' }} color="primary" variant="h4" gutterBottom>
                  Hospital Details
                </Typography>
                <Divider />
              </>
            )}
            {(userDetails === null || loading) && <Skeleton height={40} variant="text" />}
            <Box className={classes.boxDetailsText}>
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
                <Typography variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Hospital:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{userDetails.Hospital[0].nameHospital}</span>
                </Typography>
              )}
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
                <Typography noWrap={true} variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Address:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>
                    {userDetails.Hospital[0].locationFormattedAddress}
                  </span>
                </Typography>
              )}
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
                <Typography variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Hospital Type:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>
                    <Chip label={userDetails.Hospital[0].hospitalType} color="secondary" />
                  </span>
                </Typography>
              )}
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
                <Typography noWrap={true} variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Email:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{userDetails.Hospital[0].hospitalEmail}</span>
                </Typography>
              )}
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
                <Typography noWrap={true} variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Contact:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>{userDetails.Hospital[0].hospitalContactNo}</span>
                </Typography>
              )}
              {userDetails && !loading && (
                <Typography variant="subtitle1" gutterBottom>
                  <span className={classes.boxDetailsTextSpanOne}>Created:</span>
                  <span className={classes.boxDetailsTextSpanTwo}>
                    {moment(userDetails.Hospital[0].createdAt).format('LLLL')}
                  </span>
                </Typography>
              )}
              {(userDetails === null || loading) &&
                [1, 2, 3, 4, 5].map((n: number) => <Skeleton key={n} height={40} variant="text" />)}
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3} sm={6}>
        <Paper className={classes.cardHospitalImage} variant="outlined" />
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Image from 'next/image';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
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
import {
  useUploadImage,
  useCreateHospital,
  useUpdateHospital,
  useDeleteHospital,
  useCreateHospitalBeds,
  useUpdateHospitalBed,
} from '../../src/actions/hospital';
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
    cardHospital: {
      padding: theme.spacing(2),
      width: '100%',
      height: theme.spacing(32),
      display: 'grid',
      placeItems: 'center',
    },
    cardHospitalImg: {
      objectFit: 'cover',
      borderRadius: '50%',
      border: '5px solid #333',
    },
    inputText: {
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
    input: {
      display: 'none',
    },
  })
);

interface IHospitalProps {
  userDetails: any;
  loading: boolean;
  mutate: () => any;
}

export const HospitalDetails: React.FC<IHospitalProps> = ({ userDetails, loading, mutate }) => {
  const classes = useStyles();

  const [openHospitalModal, setOpenHospitalModal] = useState(false);
  const [openBedsModal, setOpenBedsModal] = useState(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const [initialHospitalFormData, setInitialHospitalFormData] = useState<IcreateHospitalInitial>({
    nameHospital: '',
    addressHospital: '',
    hospitalType: '',
    hospitalEmail: '',
    hospitalContactNo: '',
  });

  const [initialHospitalBedsFormData, setInitialHospitalBedsFormData] = useState<IcreateHospitalBedsInitial>({
    hospitalId: 0,
    hospitalName: '',
    totalBeds: 0,
    currentBeds: 0,
  });

  const [imageFile, setImageFile] = useState<null | any>(null);

  useEffect(() => {
    if (
      !editFlag &&
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
    if (
      editFlag &&
      !loading &&
      userDetails !== null &&
      userDetails.Hospital.length > 0 &&
      userDetails.Hospital[0].HospitalBeds.length === 0
    ) {
      setInitialHospitalFormData({
        nameHospital: userDetails.Hospital[0].nameHospital,
        addressHospital: userDetails.Hospital[0].locationFormattedAddress,
        hospitalType: userDetails.Hospital[0].hospitalType,
        hospitalEmail: userDetails.Hospital[0].hospiatlEmail,
        hospitalContactNo: userDetails.Hospital[0].hospitalContactNo,
      });
      return;
    }
    if (
      editFlag &&
      !loading &&
      userDetails !== null &&
      userDetails.Hospital.length > 0 &&
      userDetails.Hospital[0].HospitalBeds.length > 0
    ) {
      setInitialHospitalFormData({
        nameHospital: userDetails.Hospital[0].nameHospital,
        addressHospital: userDetails.Hospital[0].locationFormattedAddress,
        hospitalType: userDetails.Hospital[0].hospitalType,
        hospitalEmail: userDetails.Hospital[0].hospiatlEmail,
        hospitalContactNo: userDetails.Hospital[0].hospitalContactNo,
      });
      setInitialHospitalBedsFormData({
        hospitalId: userDetails.Hospital[0].id.toString(),
        hospitalName: userDetails.Hospital[0].nameHospital,
        totalBeds: userDetails.Hospital[0].HospitalBeds[0].totalBeds,
        currentBeds: userDetails.Hospital[0].HospitalBeds[0].currentBeds,
      });
      return;
    }
  }, [editFlag, loading, userDetails]);

  const [uploadImage]: any = useUploadImage();
  const [createHospital, { loading: loadingHospitalFormData }]: any = useCreateHospital();
  const [updateHospital]: any = useUpdateHospital();
  const [deleteHospital]: any = useDeleteHospital();
  const [createHospitalBeds, { loading: loadingHospitalBedsFormData }]: any = useCreateHospitalBeds();
  const [updateHospitalBed]: any = useUpdateHospitalBed();

  const handleDeleteHospital = async (id: number) => {
    await deleteHospital(id).then(() => {
      mutate();
    });
  };

  const handleSubmitHospital = async (values?: IcreateHospitalInitial) => {
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
      };
      if (!editFlag) {
        await createHospital(formData).then(({ createdHospital, status }) => {
          setInitialHospitalBedsFormData({
            ...initialHospitalBedsFormData,
            hospitalId: createdHospital.id,
            hospitalName: createdHospital.nameHospital,
          });
          if (status === 'success') {
            handleClose();
          }
          mutate();
        });
      } else {
        formData.id = userDetails.Hospital[0].id;
        await updateHospital(formData).then(({ status }) => {
          if (status === 'success') {
            handleClose();
          }
          mutate();
        });
      }
    }
  };

  const handleSubmitHospitalBeds = async (values: IcreateHospitalBedsInitial) => {
    if (!editFlag) {
      const formData: IcreateHospitalBeds = {
        hospitalId: initialHospitalBedsFormData.hospitalId,
        totalBeds: values.totalBeds,
        currentBeds: values.currentBeds,
      };
      await createHospitalBeds(formData).then(({ status }) => {
        if (status === 'success') {
          handleClose();
        }
        mutate();
      });
    } else {
      const formData: IcreateHospitalBeds = {
        id: userDetails.Hospital[0].HospitalBeds[0].id,
        hospitalId: initialHospitalBedsFormData.hospitalId,
        totalBeds: values.totalBeds,
        currentBeds: values.currentBeds,
      };
      await updateHospitalBed(formData).then(({ status }) => {
        if (status === 'success') {
          handleClose();
        }
        mutate();
      });
    }
  };

  const handleChangeImage = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData: FormData = new FormData();
    formData.append('hospitalImage', imageFile, imageFile.name);
    await uploadImage(formData).then(({ path }) => {
      const formData: IcreateHospital = {
        id: userDetails.Hospital[0].id,
        hospitalImage: path,
      };
      updateHospital(formData).then(({ status }) => {
        if (status === 'success') {
          handleClose();
        }
        mutate();
        setImageFile(null);
      });
    });
  };

  const handleClickOpenBedsForm = (isEdit?: boolean) => {
    if (isEdit) {
      setEditFlag(true);
      setOpenBedsModal(true);
      return;
    }
    setOpenBedsModal(true);
  };
  const handleClickOpenHospitalForm = (isEdit?: boolean) => {
    if (isEdit) {
      setEditFlag(true);
      setOpenHospitalModal(true);
      return;
    }
    setOpenHospitalModal(true);
  };
  const handleClose = () => {
    setOpenBedsModal(false);
    setOpenHospitalModal(false);
    setEditFlag(false);
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
            {!loading &&
              userDetails !== null &&
              userDetails.Hospital.length > 0 &&
              userDetails.Hospital[0].HospitalBeds.length > 0 && (
                <IconButton onClick={() => handleClickOpenBedsForm(true)} color="primary">
                  <Icon className="fas fa-edit" />
                </IconButton>
              )}
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
              userDetails.Hospital[0].HospitalBeds.length === 0 && (
                <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                  <IconButton onClick={() => handleClickOpenBedsForm(false)} color="primary">
                    <Icon className="fas fa-plus" />
                  </IconButton>
                  <Typography variant="caption" gutterBottom>
                    Add Total Beds
                  </Typography>
                </Box>
              )}
            <HospitalBedsForm
              initialFormData={initialHospitalBedsFormData}
              loading={loadingHospitalBedsFormData}
              handleSubmitForm={handleSubmitHospitalBeds}
              open={openBedsModal}
              handleClose={handleClose}
            />
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
                <IconButton onClick={() => handleClickOpenHospitalForm(false)} color="primary">
                  <Icon className="fas fa-plus" />
                </IconButton>
                <Typography variant="caption" gutterBottom>
                  Add a Hospital
                </Typography>
              </Box>
            </Box>
          )}
          <HospitalForm
            initialFormData={initialHospitalFormData}
            loading={loadingHospitalFormData}
            handleSubmitForm={handleSubmitHospital}
            open={openHospitalModal}
            handleClose={handleClose}
          />
          <Box className={classes.boxDetailsContainer}>
            {userDetails && userDetails.Hospital.length > 0 && !loading && (
              <>
                <Box display="flex" justifyContent="space-between">
                  <Typography style={{ fontWeight: 'bold' }} color="primary" variant="h4" gutterBottom>
                    Hospital Details
                  </Typography>
                  <Box display="flex" justifyContent="space-evenly">
                    <IconButton onClick={() => handleClickOpenHospitalForm(true)} color="primary">
                      <Icon className="fas fa-pen" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteHospital(userDetails.Hospital[0].id)} color="secondary">
                      <Icon className="fas fa-trash-alt" />
                    </IconButton>
                  </Box>
                </Box>
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
              {userDetails && userDetails.Hospital.length > 0 && !loading && (
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
        <Paper className={classes.cardHospital} variant="outlined">
          {userDetails && !loading && (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Image
                src={`/uploads/${userDetails.Hospital[0].hospitalImage.split('public/uploads/')[1]}`}
                width="155"
                height="155"
                className={classes.cardHospitalImg}
              />
              <input
                onChange={handleChangeImage}
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {imageFile !== null && (
                <Button
                  onClick={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    handleUpload();
                  }}
                  size="small"
                  variant="contained"
                  color="secondary"
                >
                  Upload
                </Button>
              )}
            </Box>
          )}
          {(userDetails === null || loading) && <Skeleton variant="circle" width={200} height={200} />}
        </Paper>
      </Grid>
    </>
  );
};

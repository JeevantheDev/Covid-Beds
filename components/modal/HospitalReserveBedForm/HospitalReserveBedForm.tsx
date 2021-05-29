/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Container, TextField, MenuItem } from '@material-ui/core';
import { IcreateReserveBed } from '../../../src/entity/reqParam';
import { HOSPITAL_TYPE } from '../../../src/entity/constant';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

interface Iprops {
  initialFormData: IcreateReserveBed;
  open: boolean;
  handleClose: () => void;
  handleSubmitForm: (values: IcreateReserveBed) => void;
}

export const HospitalReserveBedForm: React.FC<Iprops> = ({ initialFormData, open, handleClose, handleSubmitForm }) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const handleSubmitFormData = async (values: IcreateReserveBed) => {
    handleSubmitForm(values);
  };

  const clearField = () => {
    inputRef.current.value = '';
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Reserve a Bed</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <Container>
            <Formik
              initialValues={initialFormData}
              validationSchema={Yup.object().shape({
                hospitalName: Yup.string().max(30).required('Hospital name is required'),
                userPhoneNumber: Yup.string().max(100).required('User Phone number is required'),
                arrivalTime: Yup.string().required('Arrival Time must be between 45mins to 1hr.'),
                bedReserve: Yup.string().required('Bed Reserve is required.'),
              })}
              onSubmit={handleSubmitFormData}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form className={classes.formContainer} noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.hospitalName && errors.hospitalName)}
                        fullWidth
                        helperText={touched.hospitalName && errors.hospitalName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hospitalName}
                        name="hospitalName"
                        label="Hospital name"
                        variant="outlined"
                        disabled
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.userPhoneNumber && errors.userPhoneNumber)}
                        helperText={touched.userPhoneNumber && errors.userPhoneNumber}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                        value={values.userPhoneNumber}
                        fullWidth
                        label="User Phone number"
                        name="userPhoneNumber"
                        variant="outlined"
                        type="string"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        inputRef={inputRef}
                        error={Boolean(touched.arrivalTime && errors.arrivalTime)}
                        helperText={touched.arrivalTime && errors.arrivalTime}
                        onBlur={handleBlur}
                        onChange={(e: any) => {
                          const today = new Date();
                          const time: any = today.getHours().toString() + ':' + today.getMinutes().toString();
                          let hours: any = e.target.value.split(':')[0] - time.split(':')[0];
                          let minutes: any = e.target.value.split(':')[1] - time.split(':')[1];
                          minutes = minutes.toString().length < 2 ? '0' + minutes : minutes;
                          if (minutes < 0) {
                            hours--;
                            minutes = 60 + minutes;
                          }
                          hours = hours.toString().length < 2 ? '0' + hours : hours;
                          const delay = hours + ' : ' + minutes;
                          if (delay >= '00 : 45' && delay <= '01 : 00') {
                            inputRef.current.value = e.target.value;
                            handleChange(e);
                          } else {
                            clearField();
                            handleChange(e);
                          }
                        }}
                        value={values.arrivalTime}
                        name="arrivalTime"
                        fullWidth
                        label="Patient Arrival Time"
                        variant="outlined"
                        id="time"
                        type="time"
                        defaultValue="07:30"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        error={Boolean(touched.bedReserve && errors.bedReserve)}
                        helperText={touched.bedReserve && errors.bedReserve}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.bedReserve}
                        disabled
                        fullWidth
                        type="text"
                        name="bedReserve"
                        label="No of bed Reserve"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    style={{ marginTop: '15px' }}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {!isSubmitting ? 'Submit' : 'Submitting...'}
                  </Button>
                </form>
              )}
            </Formik>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

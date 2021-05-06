/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
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
import { IcreateHospitalBedsInitial } from '../../src/entity/reqParam';
import { HOSPITAL_TYPE } from '../../src/entity/constant';

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
  initialFormData: IcreateHospitalBedsInitial;
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  handleSubmitForm: (values: IcreateHospitalBedsInitial) => void;
}

export const HospitalBedsForm: React.FC<Iprops> = ({
  initialFormData,
  open,
  handleClose,
  loading,
  handleSubmitForm,
}) => {
  const classes = useStyles();

  const handleSubmitFormData = async (values: IcreateHospitalBedsInitial) => {
    handleSubmitForm(values);
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Add Hospital Beds</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <Container>
            <Formik
              initialValues={initialFormData}
              validationSchema={Yup.object().shape({
                hospitalName: Yup.string().required('Hospital Name is required.'),
                totalBeds: Yup.number().required('Hospital Total Beds is required'),
                currentBeds: Yup.number().required('Hospital Current Beds is required'),
              })}
              onSubmit={handleSubmitFormData}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form className={classes.formContainer}>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.hospitalName && errors.hospitalName)}
                        fullWidth
                        disabled
                        helperText={touched.hospitalName && errors.hospitalName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hospitalName}
                        name="hospitalName"
                        label="Hospital name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.totalBeds && errors.totalBeds)}
                        helperText={touched.totalBeds && errors.totalBeds}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.totalBeds}
                        fullWidth
                        name="totalBeds"
                        label="Total Beds"
                        variant="outlined"
                        type="number"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.currentBeds && errors.currentBeds)}
                        helperText={touched.currentBeds && errors.currentBeds}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.currentBeds}
                        fullWidth
                        type="number"
                        name="currentBeds"
                        label="Current Beds"
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

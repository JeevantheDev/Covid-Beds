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
import { IcreateHospitalInitial } from '../../src/entity/reqParam';
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
  initialFormData: IcreateHospitalInitial;
  open: boolean;
  handleClose: () => void;
  loading: boolean;
  handleSubmitForm: (values: IcreateHospitalInitial) => void;
}

export const HospitalForm: React.FC<Iprops> = ({ initialFormData, open, handleClose, loading, handleSubmitForm }) => {
  const classes = useStyles();

  const handleSubmitFormData = async (values: IcreateHospitalInitial) => {
    handleSubmitForm(values);
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Add Hospital</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <Container>
            <Formik
              initialValues={initialFormData}
              validationSchema={Yup.object().shape({
                nameHospital: Yup.string().max(30).required('Hospital name is required'),
                addressHospital: Yup.string().max(100).required('Hospital address is required'),
                hospitalType: Yup.string().required('Hospital type is required.'),
                hospitalEmail: Yup.string().email('Must be a valid email.').max(255).required('Email is required.'),
                hospitalContactNo: Yup.number().min(10).required('Contact no is required.'),
              })}
              onSubmit={handleSubmitFormData}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form className={classes.formContainer} noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.nameHospital && errors.nameHospital)}
                        fullWidth
                        helperText={touched.nameHospital && errors.nameHospital}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.nameHospital}
                        name="nameHospital"
                        label="Hospital name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(touched.addressHospital && errors.addressHospital)}
                        helperText={touched.addressHospital && errors.addressHospital}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.addressHospital}
                        fullWidth
                        name="addressHospital"
                        label="Hospital address"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        error={Boolean(touched.hospitalType && errors.hospitalType)}
                        helperText={touched.hospitalType && errors.hospitalType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hospitalType}
                        name="hospitalType"
                        select
                        fullWidth
                        label="Hospital type"
                        variant="outlined"
                      >
                        {[HOSPITAL_TYPE.PVT, HOSPITAL_TYPE.GOVT].map((type: string, idx: number) => (
                          <MenuItem key={idx} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        error={Boolean(touched.hospitalEmail && errors.hospitalEmail)}
                        helperText={touched.hospitalEmail && errors.hospitalEmail}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hospitalEmail}
                        fullWidth
                        type="email"
                        name="hospitalEmail"
                        label="Hospital email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        error={Boolean(touched.hospitalContactNo && errors.hospitalContactNo)}
                        helperText={touched.hospitalContactNo && errors.hospitalContactNo}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.hospitalContactNo}
                        type="number"
                        fullWidth
                        name="hospitalContactNo"
                        label="Contact no"
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
                    Submit
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

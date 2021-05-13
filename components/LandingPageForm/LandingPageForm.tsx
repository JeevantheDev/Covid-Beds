/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Iprops {
  handleClickSearch: (state: string, zipcode: string) => void;
}

export const LandingPageForm: React.FC<Iprops> = ({ handleClickSearch }) => {
  const classes = useStyles();
  const [formValue, setFormValue] = useState({
    state: '',
    zipcode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sm={6}>
          <TextField
            name="state"
            onChange={handleChange}
            fullWidth
            placeholder="Enter your country"
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <TextField
            name="zipcode"
            onChange={handleChange}
            fullWidth
            placeholder="Enter your zipcode"
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button
        onClick={(e: React.SyntheticEvent) => {
          e.preventDefault();
          handleClickSearch(formValue.state, formValue.zipcode);
        }}
        className={classes.button}
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </>
  );
};

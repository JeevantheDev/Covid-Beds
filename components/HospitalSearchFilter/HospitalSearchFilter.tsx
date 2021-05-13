/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';

export interface Iprops {
  onSearchSubmit: (state: string, zipcode: string) => void;
}

export const HospitalSearchFilter: React.FC<Iprops> = ({ onSearchSubmit }) => {
  const [locationInput, setLocationInput] = useState<{ state: string; zipcode: string }>({
    state: '',
    zipcode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationInput({
      ...locationInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearchSubmit(locationInput.state, locationInput.zipcode);
  };

  const { state, zipcode } = locationInput;

  return (
    <form data-testid="search-section-form">
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} sm={6}>
          <TextField
            inputProps={{ 'data-testid': 'state' }}
            value={state}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            placeholder="State"
            name="state"
          />
        </Grid>
        <Grid item xs={6} md={6} sm={6}>
          <TextField
            inputProps={{ 'data-testid': 'zipcode' }}
            value={zipcode}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            placeholder="ZipCode"
            name="zipcode"
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Button
            data-testid="submit"
            onClick={handleSearchSubmit}
            style={{ width: '100%' }}
            color="secondary"
            variant="contained"
          >
            Find Hospital
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

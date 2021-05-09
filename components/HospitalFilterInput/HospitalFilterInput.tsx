/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { MenuItem, TextField, Button } from '@material-ui/core';
import { HOSPITAL_TYPE } from '../../src/entity/constant';

export interface Iprops {
  onFilterSubmit: (hospitalType: string) => void;
}

export const HospitalFilterInput: React.FC<Iprops> = ({ onFilterSubmit }) => {
  const [filterInput, setFilterInput] = useState<string>('any');

  const handleFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
  };

  const handleFilterSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onFilterSubmit(filterInput);
    setFilterInput('');
  };

  return (
    <form data-testid="filter-input-form">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sm={12}>
          <TextField
            inputProps={{ 'data-testid': 'filterInput' }}
            onChange={handleFilterInput}
            value={filterInput}
            fullWidth
            select
            variant="outlined"
            name="filterInput"
          >
            <MenuItem value="any">Any</MenuItem>
            {[HOSPITAL_TYPE.GOVT, HOSPITAL_TYPE.PVT].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Button
            data-testid="submit"
            onClick={handleFilterSubmit}
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

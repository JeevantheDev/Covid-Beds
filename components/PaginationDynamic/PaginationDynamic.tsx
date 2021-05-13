/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  })
);

interface Iprops {
  count: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationDynamic: React.FC<Iprops> = ({ count, handleChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination onChange={handleChange} count={count} shape="rounded" />
    </div>
  );
};

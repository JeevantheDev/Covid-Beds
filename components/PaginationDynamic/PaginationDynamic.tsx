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
  page: number;
  handleNextPage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const PaginationDynamic: React.FC<Iprops> = ({ count, page, handleNextPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination page={page} onChange={handleNextPage} color="secondary" count={count} shape="rounded" />
    </div>
  );
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState } from 'react';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useRequest from '../../src/actions/index';
import { IcreateHospital } from '../../src/entity/reqParam';
import { HospitalCard } from '../../components/HospitalCard/HospitalCard';
import { HospitalFilter } from '../../components/HospitalFilter/HospitalFilter';
import { HospitalMapBox } from '../../components/HospitalMapBox/HospitalMapBox';
import { PaginationDynamic } from '../../components/PaginationDynamic/PaginationDynamic';
import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(3),
      overflow: 'hidden',
    },
    hospitalListContainer: {
      margin: theme.spacing(0.5),
      width: '100%',
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: '100%',
      },
    },
    mapContainer: {
      height: theme.spacing(50),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: theme.spacing(25),
      },
    },
    gridContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
      height: '100%',
    },
  })
);

export default function Hospitals() {
  const classes = useStyles();
  const router = useRouter();
  const { hospitalSearch } = router.query;
  const [page, setPage] = useState(0);
  const { data, loading } = useRequest({ url: `/api/hospital/${hospitalSearch}/${page}` }, null);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <MainLayout>
      <div className={classes.root}>
        <Paper className={classes.mapContainer} variant="outlined" square>
          {!loading && data.allHospitals.length > 0 && <HospitalMapBox hospitalDatas={data.allHospitals} />}
        </Paper>
        <Container maxWidth="lg">
          <Grid className={classes.gridContainer} container spacing={3}>
            <Grid item xs={12} md={4} sm={12}>
              <Grid container spacing={4}>
                <HospitalFilter />
              </Grid>
            </Grid>
            <Grid item xs={12} md={8} sm={12}>
              <Grid container spacing={4}>
                <>
                  {!loading &&
                    data.allHospitals.map((hospital: IcreateHospital) => {
                      return <HospitalCard key={hospital.id} hospitalDetail={hospital} />;
                    })}
                  {!loading && data.count > 5 && (
                    <PaginationDynamic handleChange={handleChange} count={Math.round(data.count / 2)} />
                  )}
                </>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </MainLayout>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { IcreateHospital } from '../../src/entity/reqParam';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    upperContainer: {
      width: '100%',
      height: 'auto',
      background: `linear-gradient(190deg, ${theme.palette.secondary.main} 40%, ${theme.palette.primary.light} 70%)`,
    },
    chip: {
      backgroundColor: '#28A745',
      padding: theme.spacing(0.6),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: '#fff',
      fontSize: '20px',
      fontWeight: 'bold',
      borderRadius: 5,
    },
    hospitalListContainer: {
      margin: theme.spacing(0.5),
      width: '100%',
      // padding: theme.spacing(4),
      [(theme.breakpoints.down('sm'), theme.breakpoints.down('md'))]: {
        height: '100%',
      },
    },
    circleImage: {
      borderRadius: theme.spacing(50),
    },
    gridContainer: {
      margin: theme.spacing(0.5),
      // padding: theme.spacing(4),
      width: '100%',
      height: theme.spacing(50),
    },
  })
);

type Props = {
  hospitalDetails: string;
};

export default function HospitalById({ hospitalDetails }: Props) {
  const classes = useStyles();
  const [currentHospital] = useState<IcreateHospital>(JSON.parse(hospitalDetails));
  return (
    <MainLayout>
      <div className={classes.root}>
        <Box className={classes.upperContainer}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  width: '100%',
                  height: '100%',
                }}
                item
                xs={6}
                md={6}
                sm={6}
              >
                <Image
                  className={classes.circleImage}
                  loading="eager"
                  objectFit="cover"
                  width="300"
                  height="300"
                  src={`/uploads/${currentHospital.hospitalImage.split('public/uploads/')[1]}`}
                />
              </Grid>
              <Grid
                style={{
                  width: '100%',
                }}
                item
                xs={6}
                md={6}
                sm={6}
              >
                <Box
                  style={{ height: '100%', width: '100%' }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  <Typography style={{ fontWeight: 'bold' }} variant="h4" color="textSecondary">
                    {currentHospital.nameHospital}
                  </Typography>
                  <Divider style={{ width: '70%' }} />
                  <span className={classes.chip}>{currentHospital.hospitalType}</span>
                  <span style={{ fontSize: '32px', color: '#293241' }}>
                    BEDS AVAILABLE{' '}
                    <Typography component="span" variant="h4" color="textSecondary">
                      {currentHospital.HospitalBeds[0].totalBeds} / {currentHospital.HospitalBeds[0].currentBeds}
                    </Typography>
                  </span>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id: string | string[] | any = query.id;
  const hospitalById: IcreateHospital = await prisma.hospital.findOne({
    include: { HospitalBeds: true },
    where: { id: Number(parseInt(id)) },
  });
  return {
    props: {
      hospitalDetails: JSON.stringify(hospitalById),
    },
  };
};

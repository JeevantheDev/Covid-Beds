/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useState } from 'react';
import { Container } from '@material-ui/core';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IcreateHospital } from '../../src/entity/reqParam';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

import { HospitalDetailsUpper } from '../../components/HospitalDetailsUpper/HospitalDetailsUpper';
import { HospitalDetailsMiddle } from '../../components/HospitalDetailsMiddle/HospitalDetailsMiddle';
import { HospitalDetailsLower } from '../../components/HospitalDetailsLower/HospitalDetailsLower';

const prisma = new PrismaClient();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: theme.spacing(3),
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
    <>
      <MainLayout>
        <div className={classes.root}>
          <HospitalDetailsUpper hospitalDetails={currentHospital} />
          <Container maxWidth="lg">
            <HospitalDetailsMiddle hospitalBeds={currentHospital.HospitalBeds[0]} />
            <HospitalDetailsLower hospitalDetails={currentHospital} />
          </Container>
        </div>
      </MainLayout>
    </>
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

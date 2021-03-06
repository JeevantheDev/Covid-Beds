/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useState } from 'react';
import { Container } from '@material-ui/core';
import MainLayout from '../../components/MainLayout/MainLayout';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IcreateHospital } from '../../src/entity/reqParam';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import parseCookies from '../../src/actions/parse.cookies';
import { HospitalDetailsUpper } from '../../components/HospitalDetailsUpper/HospitalDetailsUpper';
import { HospitalDetailsMiddle } from '../../components/HospitalDetailsMiddle/HospitalDetailsMiddle';
import { HospitalDetailsLower } from '../../components/HospitalDetailsLower/HospitalDetailsLower';
import { SeoWrapper } from '../../components/shared/SeoWrapper';

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
  reserveCookie: any;
};

export default function HospitalById({ hospitalDetails, reserveCookie }: Props) {
  const classes = useStyles();
  const [currentHospital] = useState<IcreateHospital>(JSON.parse(hospitalDetails));
  return (
    <SeoWrapper
      title={`Covid Beds | ${currentHospital.nameHospital}`}
      metaDescription={currentHospital.locationFormattedAddress}
      ogImage={currentHospital.hospitalImage}
      canonicalPath={`/hospital/${currentHospital.id}`}
    >
      <MainLayout cookies={reserveCookie}>
        <div className={classes.root}>
          <HospitalDetailsUpper cookies={reserveCookie} hospitalDetails={currentHospital} />
          <Container maxWidth="lg">
            <HospitalDetailsMiddle hospitalBeds={currentHospital.HospitalBeds[0]} />
            <HospitalDetailsLower hospitalDetails={currentHospital} />
          </Container>
        </div>
      </MainLayout>
    </SeoWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const id: string | string[] | any = query.id;
  const hospitalById: IcreateHospital = await prisma.hospital.findOne({
    include: { HospitalBeds: true },
    where: { id: Number(parseInt(id)) },
  });
  const reserveCookie = parseCookies(req);
  if (res) {
    if (Object.keys(reserveCookie).length === 0 && reserveCookie.constructor === Object) {
      res.writeHead(301, { Location: '/' });
      res.end();
    }
  }
  return {
    props: {
      hospitalDetails: JSON.stringify(hospitalById),
      reserveCookie: reserveCookie && reserveCookie,
    },
  };
};

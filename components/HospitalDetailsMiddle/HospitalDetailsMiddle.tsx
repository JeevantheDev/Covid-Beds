/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
import { IcreateHospitalBeds } from '../../src/entity/reqParam';
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import { FacebookIcon, LinkedinIcon, PinterestIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { Icon } from '@material-ui/core';

type Props = {
  hospitalBeds: IcreateHospitalBeds;
};

export const HospitalDetailsMiddle = ({ hospitalBeds }: Props) => {
  const [shareURL, setShareURL] = useState<string>('');

  useEffect(() => {
    setShareURL(window.location.href);
  }, []);

  return (
    <>
      <Box my={5} display="flex" justifyContent="center" alignItems="center">
        <Image loading="eager" width="200" height="200" src="/hospital-bed.png" />
        <Box mx={5} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
          <Typography
            style={{ letterSpacing: '15px', textTransform: 'uppercase', fontWeight: 'lighter' }}
            variant="h4"
            component="span"
            color="textPrimary"
          >
            Beds available:
          </Typography>
          <Divider style={{ width: '100%' }} />
          <Typography variant="h1" component="h2" color="secondary">
            {hospitalBeds.totalBeds} / {hospitalBeds.currentBeds}
          </Typography>
          <Box mt={1} style={{ width: '65%' }} display="flex" justifyContent="space-evenly" alignItems="center">
            <Icon color="primary" className="fas fa-share-alt fa-2x" />
            <FacebookShareButton url={shareURL}>
              <FacebookIcon size={35} round={true} />
            </FacebookShareButton>
            <WhatsappShareButton url={shareURL}>
              <WhatsappIcon size={35} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={shareURL}>
              <TwitterIcon size={35} round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareURL}>
              <LinkedinIcon size={35} round={true} />
            </LinkedinShareButton>
            <PinterestShareButton media="image" url={shareURL}>
              <PinterestIcon size={35} round={true} />
            </PinterestShareButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

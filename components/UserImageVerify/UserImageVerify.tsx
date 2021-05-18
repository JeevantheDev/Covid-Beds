/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Divider from '@material-ui/core/Divider';
import { Box, Button, Typography } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Cancel from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { CircularStatic } from '../shared/CircularStatic';
import { VERIFY_USER_CONDITIONS } from '../../src/entity/constant';
import Icon from '@material-ui/core/Icon';

interface Iprops {
  handleVerifiedUser: (verifyType: boolean) => void;
}

export const UserImageVerify: React.FC<Iprops> = ({ handleVerifiedUser }) => {
  const [{ alt, src, currentPic }, setPicUrl] = useState({
    src: '/placeholder.png',
    currentPic: null,
    alt: 'Upload an image',
  });
  const [ocrText, setOcrText] = useState([]);
  const [{ progress, isLoading }, setIsLoading] = useState({
    progress: 0,
    isLoading: false,
  });

  const onDrop = (pictureURL) => {
    setPicUrl({
      src: URL.createObjectURL(pictureURL),
      alt: pictureURL.name,
      currentPic: pictureURL,
    });
  };

  const runOcr = () => {
    setOcrText([]);
    if (currentPic !== null) {
      setIsLoading({ progress: 0, isLoading: true });
      Tesseract.recognize(currentPic, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setIsLoading({
              progress: m.progress * 100,
              isLoading: true,
            });
          }
        },
      })
        .then(({ data: { text } }) => {
          setOcrText((oldarray) => [...oldarray, text]);
          setIsLoading({ progress: 0, isLoading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="centered">
      <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <Box position="relative">
          <input
            onChange={(e: any) => {
              if (e.target.files.length > 0) {
                onDrop(e.target.files[0]);
              }
            }}
            accept=".jpg, .png, .jpeg"
            id="icon-button-file"
            className="fileInput mb-2"
            type="file"
          ></input>
          <label htmlFor={currentPic === null ? 'icon-button-file' : 'icon-cancel'}>
            {currentPic === null && (
              <IconButton
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, margin: 'auto' }}
                color={currentPic === null ? 'primary' : 'secondary'}
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            )}
          </label>
          {currentPic !== null && (
            <label>
              <IconButton
                onClick={() => {
                  setOcrText([]);
                  setPicUrl({
                    src: '/placeholder.png',
                    currentPic: null,
                    alt: 'Upload an image',
                  });
                  setIsLoading({ progress: 0, isLoading: false });
                }}
                style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, margin: 'auto' }}
                color={currentPic === null ? 'primary' : 'secondary'}
                aria-label="upload picture"
                component="span"
              >
                <Cancel />
              </IconButton>
            </label>
          )}
          <img src={src} alt={alt} className="img-preview" />
        </Box>
        <div className="ocr-button" onClick={runOcr}>
          {isLoading ? 'Verifying...' : 'Verify your ID'}
        </div>
      </Box>

      <Box mb={3} ml={3} p={3} style={{ width: '100%', height: '50%' }}>
        <Typography
          style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          variant="h4"
          component="span"
          color="textPrimary"
          gutterBottom
        >
          Verify using your
          <Typography
            style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
            variant="h4"
            component="span"
            color="secondary"
            gutterBottom
          >
            {' '}
            Medical Photo ID.
          </Typography>
        </Typography>
        <Divider style={{ width: '90%' }} />
        <Box mt={2} mb={2}>
          <Typography variant="h6" gutterBottom>
            Note:
          </Typography>
          <Typography variant="overline" gutterBottom>
            <ul>
              {[VERIFY_USER_CONDITIONS.NOTE1, VERIFY_USER_CONDITIONS.NOTE2, VERIFY_USER_CONDITIONS.NOTE3].map(
                (note: string) => (
                  <li key={note}>{note}</li>
                )
              )}
            </ul>
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            {progress > 0 && <CircularStatic progressValue={progress} />}
            {ocrText.length > 0 && ocrText[0].toUpperCase().includes('MEDICAL STAFF', 'HOSPITAL') && (
              <>
                <Icon style={{ color: '#28A745' }} className="fas fa-check-circle fa-4x" />
                <Button
                  onClick={() => handleVerifiedUser(true)}
                  style={{ margin: 20 }}
                  size="large"
                  color="primary"
                  variant="contained"
                >
                  Proceed to Join with us
                </Button>
              </>
            )}
            {ocrText.length > 0 && !ocrText[0].toUpperCase().includes('MEDICAL STAFF', 'HOSPITAL') && (
              <>
                <Icon style={{ color: 'red' }} className="fas fa-times-circle fa-4x" />
                <Typography style={{ margin: 20 }} variant="h6" gutterBottom>
                  Sorry!! Please verified with a valid ID.
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import BarLoader from 'react-spinners/BarLoader';
import { Box, Typography } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Cancel from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { CircularStatic } from '../shared/CircularStatic';
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
          Verify your ID
        </div>
      </Box>

      <Box
        mb={3}
        ml={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: '#ccc', width: '100%', height: '50%' }}
      >
        {ocrText.length > 0 && <Typography color="textPrimary">{ocrText[0]}</Typography>}
        {/* <BarLoader color="#3f4257" loading={isLoading} width={100} /> */}
        {progress > 0 && <CircularStatic progressValue={progress} />}
      </Box>
    </div>
  );
};

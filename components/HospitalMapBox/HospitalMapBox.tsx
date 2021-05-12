/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { IcreateHospital } from '../../src/entity/reqParam';
import Pins from './Marker';

interface Iprops {
  hospitalDatas?: IcreateHospital[];
}

export const HospitalMapBox: React.FC<Iprops> = ({ hospitalDatas }) => {
  const [coordinates, setCoordinates] = useState<any[]>([]);

  useEffect(() => {
    if (hospitalDatas.length > 0) {
      hospitalDatas.map((hospital: IcreateHospital) => {
        return setCoordinates((coordinates) => [
          ...coordinates,
          {
            lat: parseFloat(hospital.locationCoordinates.toString().split(',')[0]),
            lng: parseFloat(hospital.locationCoordinates.toString().split(',')[1]),
          },
        ]);
      });
    }
  }, [hospitalDatas]);

  const [viewport, setViewport] = React.useState({
    longitude: 85.789383,
    latitude: 20.278839,
    zoom: 8,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {coordinates.length > 0 && <Pins data={coordinates} />}
    </ReactMapGL>
  );
};

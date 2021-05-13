/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import MapGL, { Popup } from 'react-map-gl';
import { IcreateHospital } from '../../src/entity/reqParam';
import Pins from './Marker';
import HospitalInfo from './HospitalInfo';

interface Iprops {
  hospitalDatas?: IcreateHospital[] | IcreateHospital | any;
}

export const HospitalMapBox: React.FC<Iprops> = ({ hospitalDatas }) => {
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    if (hospitalDatas.length > 0) {
      hospitalDatas.map((hospital: IcreateHospital) => {
        return setCoordinates((coordinates) => [
          ...coordinates,
          {
            nameHospital: hospital.nameHospital,
            state: hospital.locationState,
            hospitalImage: hospital.hospitalImage,
            lat: parseFloat(hospital.locationCoordinates.toString().split(',')[0]),
            lng: parseFloat(hospital.locationCoordinates.toString().split(',')[1]),
          },
        ]);
      });
    } else {
      setCoordinates((coordinates) => [
        ...coordinates,
        {
          nameHospital: hospitalDatas.nameHospital,
          state: hospitalDatas.locationState,
          hospitalImage: hospitalDatas.hospitalImage,
          lat: parseFloat(hospitalDatas.locationCoordinates.toString().split(',')[0]),
          lng: parseFloat(hospitalDatas.locationCoordinates.toString().split(',')[1]),
        },
      ]);
    }
  }, [hospitalDatas]);

  const [viewport, setViewport] = React.useState({
    longitude: 85.789383,
    latitude: 20.278839,
    zoom: 0,
    bearing: 0,
    pitch: 0,
  });

  return (
    <MapGL
      mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {coordinates.length > 0 && <Pins data={coordinates} onClick={setPopupInfo} />}
      {popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <HospitalInfo info={popupInfo} />
        </Popup>
      )}
    </MapGL>
  );
};

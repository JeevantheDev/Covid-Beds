import * as React from 'react';
import { Marker } from 'react-map-gl';

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props) {
  const { data, onClick } = props;

  return data.map((hospital, index) => {
    return (
      <Marker key={`marker-${index}`} longitude={hospital.lng} latitude={hospital.lat}>
        <div style={{ cursor: 'pointer' }}>
          <img width={30} src="/hospital.svg" onClick={() => onClick(hospital)} />
        </div>
      </Marker>
    );
  });
}

export default React.memo(Pins);

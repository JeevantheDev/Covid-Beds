/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Image from 'next/image';
function HospitalInfo(props) {
  const { info } = props;
  const displayName = `${info.nameHospital}, ${info.state}`;

  return (
    <div>
      <div>{displayName}</div>
      <Image
        loading="eager"
        objectFit="contain"
        width="200"
        height="175"
        src={`/uploads/${info.hospitalImage.split('public/uploads/')[1]}`}
      />
    </div>
  );
}

export default React.memo(HospitalInfo);

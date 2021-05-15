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
      {info.hospitalImage.includes('public/upload') && (
        <Image
          loading="eager"
          objectFit="contain"
          width="200"
          height="175"
          src={`/uploads/${info.hospitalImage.split('public/uploads/')[1]}`}
        />
      )}
      {!info.hospitalImage.includes('public/upload') && <img width="200" height="175" src={info.hospitalImage} />}
    </div>
  );
}

export default React.memo(HospitalInfo);

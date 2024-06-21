"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageWithFallback = (props: {
  src: string;
  alt: string;
  className: string;
}) => {
  const [imgSrc, setImgSrc] = useState(props.src);

  return (
    <Image
      width={300}
      height={450}
      {...props}
      src={imgSrc}
      onError={() => {
        setImgSrc(
          "https://utfs.io/f/be7b69e9-7489-4025-bef9-6ef30a3ff08b-2gg.jpeg"
        );
      }}
    />
  );
};

export default ImageWithFallback;
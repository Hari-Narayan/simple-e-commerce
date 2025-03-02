import React from "react";

const CustomImage = ({ url, cssClass = "w-full h-40" }) => {
  return (
    <>
      <img
        src={url}
        alt="Product"
        className={`${cssClass} object-cover rounded-md`}
      />
    </>
  );
};

export default CustomImage;

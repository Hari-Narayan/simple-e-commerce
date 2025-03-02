import React from "react";

import CustomImage from "./CustomImage";

const OrderCard = ({ item, index }) => {
  return (
    <>
      <div
        className={`flex justify-between items-center p-4 rounded-lg shadow-md bg-white ${
          index && "mt-4"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="h-20 w-28">
            <CustomImage url={item.image} cssClass="h-20 w-28" />
          </div>
          <div className="font-semibold text-lg text-gray-800 truncate w-50">
            {item.name}
          </div>
          <div>
            <span className="text-sm text-gray-500">Price:</span>
            <span className="font-semibold ml-2">${item.price.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Item Total:</span>
            <span className="font-bold ml-2">${item.itemTotal.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">QTY:</span>
            <span className="font-bold ml-2">{item.count}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;

import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomImage from "./CustomImage";

const CartCard = ({ item, index, hanldeUpdateCount, deleteItem }) => {
  return (
    <>
      <div
        className={`flex justify-between items-center p-4 rounded-lg shadow-md relative ${
          index && "mt-4"
        } ${item.stock <= 0 ? "bg-gray-200 opacity-50" : "bg-white"}`}
      >
        {item.stock <= 0 && (
          <p className="absolute text-white bg-red-800 text-sm top-0 left-0 rounded p-2">
            Out of stock
          </p>
        )}

        <div className="flex items-center justify-between w-full">
          <div className="h-20 w-28">
            <CustomImage url={item.image} cssClass="h-20 w-28" />
          </div>

          <div className="font-semibold text-lg text-gray-800 truncate w-50">
            {item.name}
          </div>

          <div className="text-sm text-gray-500 mr-4">
            ${item.price.toFixed(2)}
          </div>

          <div className="font-semibold">${item.itemTotal.toFixed(2)}</div>

          <input
            type="text"
            className="border rounded-xl w-20 p-2 focus:outline-none text-center"
            value={item.count}
            onChange={(event) =>
              hanldeUpdateCount(item, parseInt(event.target.value))
            }
          />
          <button
            className="text-[#AD343E] focus:outline-none cursor-pointer hover:text-black"
            onClick={() => deleteItem(item)}
          >
            <FontAwesomeIcon icon={faTrash} className="fa-fw" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CartCard;

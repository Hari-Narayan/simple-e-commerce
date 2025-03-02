import React from "react";
import { useDispatch } from "react-redux";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomImage from "./CustomImage";
import { manageCart } from "../redux/slices/cartSlice";

const ProductCard = ({ data, cart }) => {
  const dispatch = useDispatch();
  const { image, name, price, stock, description } = data;

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <CustomImage url={image} />
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm bg-gray-400 px-2 rounded-md">
            {stock}
          </p>
          <p className="font-bold text-lg">${price.toFixed(2)}</p>
        </div>

        <div className="line-clamp-3 text-justify my-2">{description}</div>

        <button
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          disabled={stock === 0}
          onClick={() => dispatch(manageCart({ item: data, cart }))}
        >
          <FontAwesomeIcon icon={faCartPlus} className="fa-fw" />
        </button>
      </div>
    </>
  );
};

export default ProductCard;

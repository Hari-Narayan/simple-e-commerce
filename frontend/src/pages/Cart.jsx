import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import socket from "../socket";
import APIHelper from "../helpers/api";
import { ORDER_PLACE } from "../services/url";
import CartCard from "../components/CartCard";
import EmptyCart from "../components/EmptyCart";
import { updateCartData, updateCartDefault } from "../redux/slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [error, setError] = useState({ address: "", stock: "" });
  const { cartItems, cartCount, cartTotal, status, hasOutOfStockProduct } =
    useSelector((state) => state.cart);

  useEffect(() => {
    socket.on("updateStock", (data) => {
      const newCartItems = JSON.parse(JSON.stringify(cartItems)).map(
        (product) => {
          if (product.id === data.id) {
            product.stock = data.stock;
            return product;
          } else {
            return product;
          }
        }
      );

      dispatch(
        updateCartData({
          cartCount,
          cartTotal,
          cartItems: newCartItems,
          hasOutOfStockProduct: data.stock <= 0 ? true : false,
        })
      );
    });
  }, []);

  const deleteItem = useCallback((product) => {
    if (status === "loading") return;

    if (confirm("Are you sure?")) {
      let newCartCount = 0;
      let newCartTotal = 0;
      let newCartItems = [];

      newCartItems = JSON.parse(JSON.stringify(cartItems)).filter((item) => {
        if (product.id !== item.id) {
          newCartCount += item.count;
          newCartTotal += item.itemTotal;
          return item;
        }
      });

      dispatch(
        updateCartData({
          hasOutOfStockProduct,
          cartItems: newCartItems,
          cartCount: newCartCount,
          cartTotal: parseFloat(newCartTotal.toFixed(2)),
        })
      );
    }
  }, []);

  const handleClearCart = useCallback(() => {
    if (status === "loading") return;

    if (confirm("Are you sure, You want to clear your cart?"))
      dispatch(updateCartDefault());
  }, []);

  const hanldeUpdateCount = useCallback((product, count = 1) => {
    if (status === "loading") return;

    if (product.stock < count) {
      setError((prev) => ({
        ...prev,
        stock: `"${product.name}" has only ${product.stock} items in stock!`,
      }));
      return;
    }

    let newCartCount = 0;
    let newCartTotal = 0;
    let newCartItems = [];
    setError((prev) => ({ ...prev, stock: "" }));

    newCartItems = JSON.parse(JSON.stringify(cartItems)).map((item) => {
      if (product.id === item.id) {
        item.count = count;
        item.itemTotal = product.price * count;
      }

      newCartCount += item.count;
      newCartTotal += item.itemTotal;

      return item;
    });

    dispatch(
      updateCartData({
        hasOutOfStockProduct,
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: parseFloat(newCartTotal.toFixed(2)),
      })
    );
  }, []);

  const handleCheckOut = useCallback(async () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    } else {
      if (!address) {
        setError((prev) => ({ ...prev, address: "Address is required!" }));
        return;
      }

      setError((prev) => ({ ...prev, address: "" }));

      if (confirm("Are you sure, you want to proced?")) {
        const response = await APIHelper.post(ORDER_PLACE, {
          address,
          cartItems,
          cartTotal,
          cartCount,
        });

        if (response.status === 200) {
          dispatch(updateCartDefault());
          navigate("/thank-you", { state: { orderId: response.data.id } });
        }
      }
    }
  }, [address, cartItems, cartTotal, cartCount, isLoggedIn]);

  return (
    <>
      {cartCount > 0 ? (
        <>
          <div className="flex item-center justify-between mb-2 w-full">
            <div>
              {error && error.stock && (
                <p className="text-red-800 font-bold">{error.stock}</p>
              )}
            </div>
            <button
              onClick={handleClearCart}
              className="text-red-800 focus:outline-none border-red-800 border px-4 py-2 rounded-lg hover:bg-red-800 hover:text-white"
            >
              Clear Cart
              <FontAwesomeIcon icon={faTrash} className="pl-2 fa-fw" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              {cartItems.map((item, index) => (
                <CartCard
                  key={item.id}
                  item={item}
                  index={index}
                  deleteItem={deleteItem}
                  hanldeUpdateCount={hanldeUpdateCount}
                />
              ))}
            </div>

            <div className="col-span-1">
              <div className="p-6 rounded-lg shadow-md bg-white h-fit">
                <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b border-gray-200">
                  Cart Summary
                </h2>
                <div>
                  <label className="w-full">Address</label>
                  <textarea
                    className="w-full h-24 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-800 transition-all duration-300"
                    rows={3}
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  ></textarea>
                  {error && error.address && (
                    <p className="text-red-800 text-sm">{error.address}</p>
                  )}
                </div>
                <div className="flex justify-between items-center py-2">
                  <h2 className="text-md text-gray-800">Cart Total</h2>
                  <span className="text-md font-semibold text-gray-800">
                    {cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-200">
                  <h2 className="text-md text-gray-800">Net Pay</h2>
                  <span className="text-md font-semibold text-gray-800">
                    {cartTotal.toFixed(2)}
                  </span>
                </div>
                {!hasOutOfStockProduct && (
                  <button
                    className="w-full mt-4 uppercase bg-red-800 border-red-800 text-white rounded-lg py-2 focus:outline-none cursor-pointer hover:bg-white hover:text-red-800 border hover:border-red-800 transition-all duration-300"
                    onClick={handleCheckOut}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;

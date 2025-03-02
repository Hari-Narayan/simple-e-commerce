import React, { useCallback, useEffect, useState } from "react";

import APIHelper from "../helpers/api";
import { ORDER_LIST } from "../services/url";
import OrderCard from "../components/OrderCard";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const response = await APIHelper.get(ORDER_LIST);
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [ORDER_LIST]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 pb-4">Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div className="grid grid-cols gap-6 mb-4" key={order.id}>
            <div className="col-span-1">
              <div className="p-6 rounded-lg  bg-gray-200 h-fit">
                <div className="flex justify-between items-center">
                  <div className="flex flex-row items-center space-x-4">
                    <span>Order ID: </span>
                    <div className="text-lg font-bold my-4">#{order.id}</div>
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                    <span>Address: </span>
                    <div className="text-lg font-bold my-4">
                      {order.address}
                    </div>
                  </div>
                  <div className="flex flex-row items-center space-x-4">
                    <span>Date: </span>
                    <div className="text-lg font-bold my-4">
                      {order.createdAt}
                    </div>
                  </div>
                </div>
                {order.cartItems.map((item, index) => (
                  <div className="my-2" key={item.id + index}>
                    <OrderCard key={order.id} item={item} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No orders found</div>
      )}
    </>
  );
};

export default MyOrders;

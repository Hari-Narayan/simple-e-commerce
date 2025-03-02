import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import socket from "../socket";
import APIHelper from "../helpers/api";
import { PRODUCT_LIST } from "../services/url";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const cart = useSelector((state) => state.cart);

  const getProducts = useCallback(async () => {
    try {
      const response = await APIHelper.get(PRODUCT_LIST);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [PRODUCT_LIST]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    socket.on("updateStock", (data) => {
      setProducts((prev) => {
        return prev.map((product) => {
          return product.id === data.id ? data : product;
        });
      });
    });

    socket.on("updateMultiStock", (data) => {
      setProducts((prev) => {
        return prev.map((product) => {
          const updatedProduct = data.find((item) => item.id === product.id);

          return updatedProduct || product;
        });
      });
    });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} data={product} cart={cart} />
          ))}
      </div>
    </>
  );
}

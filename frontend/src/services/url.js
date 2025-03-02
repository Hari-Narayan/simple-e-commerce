const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SOCKET_BASE_URL = BASE_URL;
export const API_BASE_URL = `${BASE_URL}/api`;

export const LOGIN = "/auth/login";
export const ORDER_LIST = "/order/list";
export const ORDER_PLACE = "/order/place";
export const PRODUCT_LIST = "/product/list";

import { LOGIN } from "./url";
import APIHelper from "../helpers/api";

export const fetchUser = async (user) => {
  const response = await APIHelper.post(LOGIN, user);

  const result = await response.data;

  return result;
};

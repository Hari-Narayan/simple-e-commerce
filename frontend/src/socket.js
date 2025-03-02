import { io } from "socket.io-client";

import { SOCKET_BASE_URL } from "./services/url";

const socket = io(SOCKET_BASE_URL, {
  withCredentials: true,
});

export default socket;

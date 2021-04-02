import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5001";
const socket = io(SOCKET_SERVER_URL);

export { socket };
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";
const socket = socketIOClient(SOCKET_SERVER_URL);

export default socket;
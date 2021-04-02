import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5001";
const socket = io(SOCKET_SERVER_URL);
let playerId = '';

socket.on('connect', () => playerId = socket.id);

export { socket, playerId };
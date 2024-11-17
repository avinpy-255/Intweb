import { io, Socket } from "socket.io-client";

const socketUrl: string = import.meta.env.VITE_API_URL; // Replace with your backend URL

if (!socketUrl) {
  throw new Error("Socket URL is not defined");
}

const socket: Socket = io(socketUrl, {
  reconnectionDelayMax: 1000,
});

export default socket;
import { Server } from "http";
import * as socketIO from "socket.io";
import { authenticationHandler } from "./AuthencationHandler";
import { connectHandler } from "./ConnectionHandler";
import config from "../config/Index";
// import SocketAdapter from "./Adapter";


const { redis } = config;
const redisconfig: any = {
    host: redis.host,
    port: redis.port
};

let socket: socketIO.Server;

const initWebSocket = (server: Server) => {
    socket = socketIO.default(server, { pingInterval: 5000 });
    // socket.adapter(new SocketAdapter(redisconfig).initAdapter());  // *** @redisAdapter for cluster enviroment.
    socket.use(authenticationHandler).use(connectHandler);
};

export {
    socket,
    initWebSocket
};

import logger from "../core/utility/Logger";
import { SocketMiddleware, SocketHandler, SocketCallback } from "./types/Type";
import { socketEventEnum as socketEvent, socketEventEnum } from "./types/SocketEventEnum";
import AppError from "../core/utility/AppError";
import { socketMessageEnum as socketMessage, socketMessageEnum } from "./types/SocketMessageEnum";
import { SocketState } from "./interface/SocketState";
import { storeEventsEnum as actionType } from "./types/StoreEventsEnum";
import * as store from "./Store";


export const connectHandler: SocketMiddleware = async (socket, next) => {

    if (!socket.user) {
        return next(new AppError(socketMessage.notAuthenticated));
    }

    const { email: identity, application } = socket.user; //**@ get user unique identity.
    const state: SocketState = {
        uniqueIdentity: `${application}_${identity}`,
        socketId: [socket.id]
    };
    const appState: SocketState = {
        uniqueIdentity: application,
        socketId: [socket.id]
    };
    await store.dispatch(actionType.add, state);  //**@ dipatch event to redis store with socket id.
    await store.dispatch(actionType.add, appState);  //**@ dipatch event to redis store with socket id.
    logger.warn(`process: ${process.pid} : ${socketMessageEnum.userJoined} : ${identity}`);
    socket.on(socketEvent.disconnected, disconnectHandler(socket));
    socket.emit(socketEventEnum.websocketMessage, { identity, application });
    // socket.emit(socketEventEnum.websocketMessage, ` ${socketMessage.welcome} ${identity}`);
    // setInterval(() => {
    // }, 3000);
    return next();

};


const disconnectHandler: SocketHandler = (socket) => {
    return async () => {
        const { email: identity, application } = socket.user; //**@ get user unique identity.
        const state: SocketState = {
            uniqueIdentity: `${application}_${identity}`,
            socketId: [socket.id]
        };
        const appState: SocketState = {
            uniqueIdentity: application,
            socketId: [socket.id]
        };
        await store.dispatch(actionType.remove, state); //**@ dipatch event to redis store with socket id.
        await store.dispatch(actionType.remove, appState); //**@ dipatch event to redis store with socket id.
        logger.warn(`process: ${process.pid} : ${socketMessageEnum.userLeft} : ${identity}`);

    };
};

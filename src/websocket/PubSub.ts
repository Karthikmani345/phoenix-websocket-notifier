import * as io from "socket.io-emitter";
import { each } from "async";
import { socket } from "./Index";
import { emitMapper } from "./Mapper";
import logger from "../core/utility/Logger";
import { socketEventEnum } from "./types/SocketEventEnum";
import config from "@api/config/Index";


const pubSub = (() => {
    const { redis: redisConfig } = config;
    const emitter = io.default({
        host: redisConfig.host,
        port: redisConfig.port
    });

    // @** emits to specific users Identity in multiple nodes.
    const emit = async (toIdentity: string, eventType: socketEventEnum, payload: any) => {
        const request = await emitMapper({ toIdentity, eventType, payload });
        logger.info(`emitted - Process : ${process.pid} to : ${request.toIdentity}`);
        logger.warn(`[PubSub.ts] [emit] : to : ${request.toIdentity} -- EventType  ${request.eventType} -- Payload  ${JSON.stringify(request.payload)}`);
        // @** emit to all socketIds session in single or multiple process enviroment i.e cluster
        await each(request.socketIds, (id: string, done) => {
            // emitter.to(id).emit(request.eventType, request.payload);
            socket.to(id).emit(request.eventType, request.payload);
            done();
        });

    };

    // @** emits to all users connected to socket in multiple nodes.
    const broadcast = async (eventType: socketEventEnum, payload: any) => {
        logger.info(`emitted - Process : ${process.pid}`);
        emitter.broadcast.emit(eventType, payload);
    };

    return {
        emit,
        broadcast
    };

})();

export default pubSub;

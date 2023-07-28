import * as IoRedis from "ioredis";
import RedisIO from "./Redis";
import * as async from "async";
import { SocketState } from "./interface/SocketState";
import { storeEventsEnum } from "./types/StoreEventsEnum";
import { StoreHandlers } from "./types/Type";
import config from "@api/config/Index";


const { redis: redisConfig } = config;
const redisOptions: IoRedis.RedisOptions = {
    port: redisConfig.port,
    host: redisConfig.host,
    db: redisConfig.db
};

const store = new RedisIO(redisOptions, true);


export const dispatch = (actionType: storeEventsEnum, args: SocketState, uuid?: string) => (
    new Promise((resolve, reject) => {
        const handler = actions[actionType];
        handler(args).then(res => resolve(res)).catch(err => reject(err));
    })
);


const actions: StoreHandlers = {
    [storeEventsEnum.add]: (state: SocketState) => (
        new Promise(async (resolve, reject) => {
            try {
                const res = await store.instance.sadd(state.uniqueIdentity, state.socketId);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    ),
    [storeEventsEnum.remove]: (state: SocketState) => (
        new Promise(async (resolve, reject) => {
            try {
                const res = await store.instance.srem(state.uniqueIdentity, state.socketId);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    ),
    [storeEventsEnum.get]: (state: SocketState) => (
        new Promise(async (resolve, reject) => {
            try {
                const res = await store.instance.smembers(state.uniqueIdentity);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        })
    ),
};

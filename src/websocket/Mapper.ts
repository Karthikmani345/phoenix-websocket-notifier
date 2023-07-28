import { storeEventsEnum as actionType } from "./types/StoreEventsEnum";
import * as store from "./Store";

// @** maps the toEmit user to its respectives socketid which is persisted in store.
export const emitMapper = async ({ toIdentity, eventType, payload }
    : { toIdentity: string, eventType: string, payload: any })
    : Promise<{
        socketIds: string[]
        toIdentity: string
        eventType: string
        payload: any
    }> => {
    const toIds = await store.dispatch(actionType.get, { uniqueIdentity: toIdentity, socketId: null });
    const socketIds = toIds as string[];
    return {
        socketIds,
        toIdentity,
        eventType,
        payload,
    };
};


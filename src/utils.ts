import type { LeafletEventHandlerFnMap } from 'leaflet'

export const cancelDebounces = (handlerMethods: LeafletEventHandlerFnMap) => {
    for (const name of Object.keys(handlerMethods)) {
        const handler = handlerMethods[name];
        if(handler && isFunction(handler.cancel)) {
            handler.cancel();
        }
    }
};


export const isFunction = (x: unknown) => typeof x === "function";

import { Evented, type LeafletEventHandlerFnMap } from 'leaflet'
import { type DefineProps, watch } from 'vue'

export const cancelDebounces = (handlerMethods: LeafletEventHandlerFnMap) => {
    for (const name of Object.keys(handlerMethods)) {
        const handler = handlerMethods[name]
        if (handler && isFunction(handler.cancel)) {
            handler.cancel()
        }
    }
}


export const isFunction = (x: unknown) => typeof x === 'function'

export const propsBinder = (methods, leafletElement: Evented, props) => {
    for (const key in props) {
        const setMethodName = "set" + capitalizeFirstLetter(key);
        if (methods[setMethodName]) {
            watch(
                () => props[key],
                (newVal, oldVal) => {
                    methods[setMethodName](newVal, oldVal);
                }
            );
        } else if (leafletElement[setMethodName]) {
            watch(
                () => props[key],
                (newVal) => {
                    leafletElement[setMethodName](newVal);
                }
            );
        }
    }
};

export declare type ListenersAndAttrs = {
    listeners: LeafletEventHandlerFnMap;
    attrs: Record<string, unknown>;
};

export const bindEventHandlers = (
    leafletObject: Evented,
    eventHandlers: LeafletEventHandlerFnMap
) => {
    for (const eventName of Object.keys(eventHandlers)) {
        leafletObject.on(eventName, eventHandlers[eventName])
    }
}

export const resetWebpackIcon = async (Icon) => {
    const modules = await Promise.all([
        import('leaflet/dist/images/marker-icon-2x.png'),
        import('leaflet/dist/images/marker-icon.png'),
        import('leaflet/dist/images/marker-shadow.png')
    ])

    delete Icon.Default.prototype._getIconUrl

    Icon.Default.mergeOptions({
        iconRetinaUrl: modules[0].default,
        iconUrl: modules[1].default,
        shadowUrl: modules[2].default
    })
}

export const remapEvents = (contextAttrs: Record<string, unknown>): ListenersAndAttrs => {
    const listeners: LeafletEventHandlerFnMap = {}
    const attrs: Record<string, unknown> = {}
    for (const attrName in contextAttrs) {
        if (
            attrName.startsWith('on') &&
            !attrName.startsWith('onUpdate') &&
            attrName !== 'onReady'
        ) {
            const eventName = attrName.slice(2).toLocaleLowerCase()
            listeners[eventName] = contextAttrs[attrName]
        } else {
            attrs[attrName] = contextAttrs[attrName]
        }
    }

    return { listeners, attrs }
}

/**
 * Wrap a placeholder function and provide it with the given name.
 * The wrapper can later be updated with {@link updateLeafletWrapper}
 * to provide a different function.
 *
 * @param {String} methodName Key used to provide the wrapper function
 */
export const provideLeafletWrapper = (methodName: string) => {
    const wrapped = ref((..._args: any[]) =>
        console.warn(`Method ${methodName} has been invoked without being replaced`)
    );
    const wrapper = (...args: any[]) => wrapped.value(...args);
    wrapper.wrapped = wrapped;
    provide(methodName, wrapper);

    return wrapper;
};

/**
 * Change the function that will be executed when an injected Leaflet wrapper
 * is invoked.
 *
 * @param {*} wrapper Provided wrapper whose wrapped function is to be updated
 * @param {function} leafletMethod New method to be wrapped by the wrapper
 */
export const updateLeafletWrapper = (wrapper, leafletMethod) =>
    (wrapper.wrapped.value = leafletMethod);

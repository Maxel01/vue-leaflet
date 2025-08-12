// REWRITE DONE
import { type Evented, type LeafletEventHandlerFnMap } from 'leaflet'
import { inject, type InjectionKey, provide, type Ref, ref, watch } from 'vue'
import type { ComponentProps } from './functions/component'

// BREAKING CHANGES: remove type Data
export declare type ListenersAndAttrs = {
    listeners: LeafletEventHandlerFnMap
    attrs: Record<string, unknown>
}

/**
 * A generalized interface/type to type-hint whatever may be defined in a class/object.
 */
export type PropertyMap = {
    [propertyName: string]: unknown,
}

export type FunctionMap = Record<string, ((...args: unknown[]) => unknown) | undefined>

export type LeafletWrapper = {
    (...args: unknown[]): unknown
    wrapped: Ref<(...args: unknown[]) => unknown>
};


export const bindEventHandlers = (
    leafletObject: Evented,
    eventHandlers: LeafletEventHandlerFnMap
): void => {
    for (const [eventName, eventHandler] of Object.entries(eventHandlers)) {
        leafletObject.on(eventName, eventHandler)
    }
}

export const cancelDebounces = (handlerMethods: LeafletEventHandlerFnMap) => {
    for (const [, eventHandler] of Object.entries(handlerMethods)) {
        if (isFunction(eventHandler?.cancel)) {
            eventHandler.cancel()
        }
    }
}

export const capitalizeFirstLetter = (s: string) => {
    if (!s || typeof s.charAt !== 'function') {
        return s
    }
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const isFunction = (x: unknown) => typeof x === 'function'

/**
 * Sets up listeners for Vue component prop changes, so that we may correctly call the correct Leaflet on-change event handlers.
 * @param methods
 * @param leafletElement
 * @param props the relevant Vue component props
 */
export const propsBinder = (methods: Readonly<FunctionMap>, leafletElement: PropertyMap, props: Readonly<PropertyMap>) => {
    for (const key in props) {
        const setMethodName = 'set' + capitalizeFirstLetter(key)
        const setterMethod = methods[setMethodName]
        if (isFunction(setterMethod)) {
            watch(
                () => props[key],
                (newVal, oldVal) => {
                    setterMethod(newVal, oldVal)
                }
            )
            continue
        }
        const leafletElementSetter = leafletElement[setMethodName]
        if (isFunction(leafletElementSetter)) {
            watch(
                () => props[key],
                (newVal) => {
                    leafletElementSetter(newVal)
                }
            )
        } else if (key !== 'options' && import.meta.env.vitest) {
            console.warn(`No setter for '${key}'`)
        }
    }
}

export const propsToLeafletOptions = <T extends object>(
    props: ComponentProps,
    baseOptions: Partial<T> = {}
): T => {
    const output = { ...baseOptions }

    for (const key in props) {
        if (
            key === 'options' ||
            props[key as keyof ComponentProps] === undefined /* || !(key in baseOptions) */
        ) {
            continue
        }

        output[key as keyof T] = props[key as keyof ComponentProps] as T[keyof T]
    }

    return output as T
}

export const remapEvents = (contextAttrs: Record<string, unknown>): ListenersAndAttrs => {
    // note: additional Leaflet extensions may have their custom event handlers, so we will be general here and type-hint it as FunctionMap
    const listeners: FunctionMap = {}
    const attrs: Record<string, unknown> = {}
    for (const attrName in contextAttrs) {
        if (
            attrName.startsWith('on') &&
            !attrName.startsWith('onUpdate') &&
            attrName !== 'onReady'
        ) {
            const eventName = attrName.slice(2).toLocaleLowerCase()
            const eventHandler = contextAttrs[attrName]
            if (isFunction(eventHandler)) {
                // note: if handler is undefined, then might as well don't tell Leaflet about it
                listeners[eventName] = eventHandler as (...args: unknown[]) => unknown
            }
        } else {
            attrs[attrName] = contextAttrs[attrName]
        }
    }

    return { listeners, attrs }
}

// TODO It seems like Icon.Default is now IconDefault in leaflet v2
export const resetWebpackIcon = async (Icon) => {
//export const resetWebpackIcon = async (Icon: typeof IconDefault) => {
    const modules = await Promise.all([
        import('leaflet/dist/images/marker-icon-2x.png'),
        import('leaflet/dist/images/marker-icon.png'),
        import('leaflet/dist/images/marker-shadow.png')
    ])

    //delete IconDefault.prototype._getIconUrl
    delete Icon.Default.prototype._getIconUrl

    Icon.Default.mergeOptions({
        iconRetinaUrl: modules[0].default,
        iconUrl: modules[1].default,
        shadowUrl: modules[2].default
    })
}

/**
 * Wrap a placeholder function and provide it with the given name.
 * The wrapper can later be updated with {@link updateLeafletWrapper}
 * to provide a different function.
 *
 * @param {String} methodName Key used to provide the wrapper function
 */
export const provideLeafletWrapper = (methodName: InjectionKey<unknown>): LeafletWrapper => {
    const wrapped = ref((..._args: unknown[]) =>
        console.warn(`Method ${String(methodName)} has been invoked without being replaced`)
    )
    const wrapper = (...args: unknown[]) => wrapped.value(...args)
    wrapper.wrapped = wrapped
    provide(methodName, wrapper)

    return wrapper
}

/**
 * Change the function that will be executed when an injected Leaflet wrapper
 * is invoked.
 *
 * @param {*} wrapper Provided wrapper whose wrapped function is to be updated
 * @param {function} leafletMethod New method to be wrapped by the wrapper
 */
export const updateLeafletWrapper = (wrapper: LeafletWrapper, leafletMethod: (...args: unknown[]) => unknown) =>
    (wrapper.wrapped.value = leafletMethod)

// BREAKING CHANGES: remove WINDOW_OR_GLOBAL

export const assertInject = <T>(key: InjectionKey<T>) => {
    const value = inject<T>(key)
    if (value === undefined) {
        throw new Error(`Attempt to inject ${key.description} before it was provided.`)
    }

    return value
}

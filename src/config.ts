export interface ExperimentalFlags {
    /**
     * The `propsBinder` utility binds every reactive property to a watcher (see [reactivity in vue-leaflet](./reactivity-leaflet)). When enabled, any props that are `undefined` will be skipped and will no longer be reactive. This reduces the number of watchers and improves performance.
     */
    skipUndefinedProps: boolean
}

export interface LeafletConfig {
    experimental: ExperimentalFlags
}

export const vueLeafletConfig: LeafletConfig = {
    experimental: {
        skipUndefinedProps: false
    }
}

type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export function setVueLeafletConfig(config: DeepPartial<LeafletConfig>) {
    config.experimental = {
        ...vueLeafletConfig.experimental,
        ...config.experimental
    }
    Object.assign(vueLeafletConfig, config)
}

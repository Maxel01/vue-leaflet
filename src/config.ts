export interface ExperimentalFlags {
    /**
     * Automatically resets Webpack icons (used for Leaflet's default markers). This was required in Leaflet v1, but it may no longer be necessary in v2. **If you use it, please create an issue or discussion to report whether it still works**.
     */
    useResetWebpackIcon: boolean
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
        useResetWebpackIcon: true,
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

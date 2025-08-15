export interface ExperimentalFlags {
    useResetWebpackIcon: boolean
    skipUndefinedProps: boolean
}

export interface LeafletConfig {
    experimental: ExperimentalFlags
}

export const vueLeafletConfig: LeafletConfig = {
    experimental: {
        useResetWebpackIcon: true,
        skipUndefinedProps: true
    }
}

export function setLeafletConfig(config: Partial<LeafletConfig>) {
    Object.assign(vueLeafletConfig, config)
    vueLeafletConfig.experimental = {
        ...vueLeafletConfig.experimental,
        ...config.experimental,
    }
}

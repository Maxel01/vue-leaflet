export interface ComponentProps<T extends object = object> {
    /**
     * Leaflet options to pass to the component constructor.
     * @initOnly
     */
    options?: T
}

export const componentPropsDefaults = {
    options: () => ({})
}

export const setupComponent = (props: ComponentProps) => {
    return { options: props.options, methods: {} }
}

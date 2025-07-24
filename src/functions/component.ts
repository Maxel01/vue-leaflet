export interface ComponentProps<T extends object = object> {
    options?: T
}

export const componentPropsDefaults = {
    options: () => ({}),
}

export const setupComponent = (props: ComponentProps) => {
    return { options: props.options, methods: {} }
}

export const componentProps = {
    options: {
        type: Object,
        default: () => ({}),
        custom: true,
    },
} as const;

export const setupComponent = () => {
    return { methods: {} };
};

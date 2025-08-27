import { describe, it, expect } from 'vitest'
import { propsToLeafletOptions } from '../../../src/utils'

interface ComponentProps {
    options?: object
    color?: string
    weight?: number
    opacity?: number
    [key: string]: unknown
}

describe('propsToLeafletOptions', () => {
    it('should merge props into baseOptions', () => {
        const props: ComponentProps = {
            color: 'red',
            weight: 5
        }

        const baseOptions = {
            opacity: 0.8
        }

        const result = propsToLeafletOptions<ComponentProps>(props, baseOptions)

        expect(result).toEqual({
            color: 'red',
            weight: 5,
            opacity: 0.8
        })
    })

    it('should ignore undefined values in props', () => {
        const props: ComponentProps = {
            color: 'blue',
            weight: undefined
        }

        const baseOptions = {
            color: 'blue',
            opacity: 0.5
        }

        const result = propsToLeafletOptions<ComponentProps>(props, baseOptions)

        expect(result).toEqual({
            weight: undefined,
            color: 'blue',
            opacity: 0.5
        })
    })

    it('should ignore the "options" key in props', () => {
        const props: ComponentProps = {
            options: { some: 'value' },
            color: 'green'
        }

        const baseOptions = {
            weight: 2
        }

        const result = propsToLeafletOptions<ComponentProps>(props, baseOptions)

        expect(result).toEqual({
            color: 'green',
            weight: 2
        })
    })

    it('should work with empty baseOptions', () => {
        const props: ComponentProps = {
            color: 'yellow',
            weight: 1
        }

        const result = propsToLeafletOptions<ComponentProps>(props)

        expect(result).toEqual({
            color: 'yellow',
            weight: 1
        })
    })

    it('should return baseOptions unchanged if props are empty', () => {
        const props: ComponentProps = {}

        const baseOptions = {
            color: 'purple',
            weight: 4
        }

        const result = propsToLeafletOptions<ComponentProps>(props, baseOptions)

        expect(result).toEqual(baseOptions)
    })

    it('should overwrite baseOptions if defined in props', () => {
        const props: ComponentProps = {
            color: 'red'
        }

        const baseOptions = {
            color: 'purple',
            weight: 4
        }

        const result = propsToLeafletOptions<ComponentProps>(props, baseOptions)

        expect(result).toEqual({
            color: 'red',
            weight: 4
        })
    })
})

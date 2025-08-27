import { describe, expect, it, vi } from 'vitest'
import { propsBinder } from '../../../src/utils'
import { nextTick, reactive } from 'vue'

describe('propsBinder', () => {
    it('should bind props to methods object using watchers', async () => {
        const methods = {
            setColor: vi.fn(),
        }

        const leafletElement = {}
        const props = reactive({
            color: 'red',
        })

        propsBinder(methods, leafletElement, props)

        props.color = 'blue'
        await nextTick()

        expect(methods.setColor).toHaveBeenCalledWith('blue', 'red')
    })

    it('should bind props to leafletElement if method not in methods object', async () => {
        const methods = {}
        const leafletElement = {
            setOpacity: vi.fn(),
        }

        const props = reactive({
            opacity: 0.5,
        })

        propsBinder(methods, leafletElement, props)

        props.opacity = 0.8
        await nextTick()

        expect(leafletElement.setOpacity).toHaveBeenCalledWith(0.8)
    })

    it('should not bind props if no matching setMethod exists', async () => {
        const methods = {}
        const leafletElement = {
            setOpacity: vi.fn(),
        }
        const props = reactive({
            weight: 3,
        })
        const result = propsBinder(methods, leafletElement, props)

        props.weight = 5
        await nextTick()

        expect(leafletElement.setOpacity).not.toHaveBeenCalled()
        expect(result).toStrictEqual(["weight"])
    })
})

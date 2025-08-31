import { describe, it, expect } from 'vitest'
import { remapEvents } from '@/utils'

describe('remapEvents', () => {
    it('should separate event listeners from attributes', () => {
        const input = {
            onClick: () => {},
            onMouseover: () => {},
            title: 'Hello',
            id: 'marker-1'
        }

        const { listeners, attrs } = remapEvents(input)

        expect(Object.keys(listeners)).toEqual(['click', 'mouseover'])
        expect(Object.keys(attrs)).toEqual(['title', 'id'])
    })

    it('should ignore onUpdate* and onReady as listeners', () => {
        const input = {
            onClick: () => {},
            onUpdateModelValue: () => {},
            onReady: () => {},
            name: 'Test'
        }

        const { listeners, attrs } = remapEvents(input)

        expect(Object.keys(listeners)).toEqual(['click'])
        expect(Object.keys(attrs)).toEqual(['onUpdateModelValue', 'onReady', 'name'])
    })

    it('should handle empty input gracefully', () => {
        const { listeners, attrs } = remapEvents({})

        expect(listeners).toEqual({})
        expect(attrs).toEqual({})
    })

    it('should preserve original values', () => {
        const clickHandler = () => {}
        const input = {
            onClick: clickHandler,
            label: 'Test'
        }

        const { listeners, attrs } = remapEvents(input)

        expect(listeners.click).toBe(clickHandler)
        expect(attrs.label).toBe('Test')
    })
})

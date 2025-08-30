import { bindEventHandlers } from '@/utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Evented, LeafletEventHandlerFnMap } from 'leaflet'

describe('bindEventHandlers', () => {
    let mockLeafletObject: Evented

    beforeEach(() => {
        mockLeafletObject = {
            on: vi.fn()
        } as unknown as Evented
    })

    it('binds all event handlers correctly', () => {
        const handlers = {
            click: vi.fn(),
            mouseover: vi.fn()
        }

        bindEventHandlers(mockLeafletObject, handlers)

        expect(mockLeafletObject.on).toHaveBeenCalledTimes(2)
        expect(mockLeafletObject.on).toHaveBeenCalledWith('click', handlers.click)
        expect(mockLeafletObject.on).toHaveBeenCalledWith('mouseover', handlers.mouseover)
    })

    it('does not bind any events if the handler map is empty', () => {
        const handlers = {}

        bindEventHandlers(mockLeafletObject, handlers)

        expect(mockLeafletObject.on).not.toHaveBeenCalled()
    })

    it('binds undefined or null handlers', () => {
        const handlers = {
            click: undefined,
            zoom: null
        } as LeafletEventHandlerFnMap

        bindEventHandlers(mockLeafletObject, handlers)

        expect(mockLeafletObject.on).toHaveBeenCalledWith('click', undefined)
        expect(mockLeafletObject.on).toHaveBeenCalledWith('zoom', null)
    })
})

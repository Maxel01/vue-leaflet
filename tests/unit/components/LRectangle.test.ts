import { config, flushPromises, shallowMount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LRectangle from '../../../src/components/LRectangle.vue'
import { AddLayerInjection, RemoveLayerInjection } from '../../../src/types/injectionKeys'
import { LatLng, LatLngBounds, Rectangle } from 'leaflet'
import { testRemoveLayerOnUnmount } from './helper/tests'
import { testComponentPropBindings, testPropsBindingToLeaflet } from './helper/propsBindingTests'
import { testEmitsReady } from './helper/emitTests'
import { mockAddLayer, mockRemoveLayer, testAddLayer } from './helper/injectionsTests'
import { mergeReactiveProps } from './helper/props'
import { polygonProps } from './wrapper/LPolygonProps'

const rectangleProps = mergeReactiveProps(polygonProps, {
    bounds: [
        new LatLng(46.2, -1.5),
        new LatLng(46.3, -1.5),
        new LatLng(46.3, -1.1),
        new LatLng(46.2, -1.1)
    ],
    latLngs: [
        [26.774, -81.19],
        [19.466, -67.118],
        [33.321, -65.757],
        [26.774, -81.19]
    ],
    expecting: {
        bounds: (leafletObject: Rectangle) => {
            expect(leafletObject.getBounds()).toStrictEqual(
                new LatLngBounds([46.3, -1.1], [46.2, -1.5])
            )
        },
        latLngs: (leafletObject: Rectangle) => {
            expect(leafletObject.getLatLngs()).toStrictEqual([
                [
                    new LatLng(19.466, -81.19),
                    new LatLng(33.321, -81.19),
                    new LatLng(33.321, -65.757),
                    new LatLng(19.466, -65.757)
                ]
            ])
        }
    }
})

const createWrapper = async (props = {}) => {
    const wrapper = shallowMount(LRectangle, {
        propsData: {
            latLngs: [
                [46.334852, -1.509485],
                [46.342596, -1.328731],
                [46.241487, -1.190568],
                [46.234787, -1.358337],
                [46.294733, -1.234567]
            ],
            ...props
        },
        global: {
            provide: {
                [AddLayerInjection as symbol]: mockAddLayer,
                [RemoveLayerInjection as symbol]: mockRemoveLayer
            }
        }
    })

    await flushPromises()
    return wrapper
}

describe('LRectangle.vue', () => {
    testEmitsReady(createWrapper)
    testComponentPropBindings(createWrapper, 'LRectangle')
    testPropsBindingToLeaflet(createWrapper, rectangleProps)
    testRemoveLayerOnUnmount(createWrapper)

    testCorrectInitialisation(createWrapper)
    testAddLayer(createWrapper)
})

const testCorrectInitialisation = (getWrapper: (props?) => Promise<VueWrapper<any>>) => {
    it('creates a Leaflet rectangle with correct options', async () => {
        const wrapper = await getWrapper()
        const obj = wrapper.vm.leafletObject as Rectangle

        expect(obj).toBeDefined()
        expect(obj.getLatLngs()).toStrictEqual([
            [
                new LatLng(46.234787, -1.509485),
                new LatLng(46.342596, -1.509485),
                new LatLng(46.342596, -1.190568),
                new LatLng(46.234787, -1.190568)
            ]
        ])
    })
    it('creates a Leaflet rectangle with undefined latLngs', async () => {
        let caughtError: unknown = null
        config.global.config.errorHandler = (err) => {
            caughtError = err
        }
        await getWrapper({ latLngs: undefined })
        expect(caughtError).toBeInstanceOf(Error)
        expect((caughtError as Error).message).toMatch("Specify bounds or LatLngs for a valid rectangle.")

    })
    it('creates a Leaflet rectangle with bounds', async () => {
        const wrapper = await getWrapper({
            bounds: [
                [46.234787, -1.509485],
                [46.342596, -1.190568]
            ]
        })
        const obj = wrapper.vm.leafletObject as Rectangle

        expect(obj.getBounds()).toStrictEqual(
            new LatLngBounds([46.234787, -1.509485], [46.342596, -1.190568])
        )
    })
}

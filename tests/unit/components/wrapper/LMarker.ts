import { flushPromises, mount } from '@vue/test-utils'
import { AddLayerInjection, RemoveLayerInjection } from '../../../../src/types/injectionKeys'
import { mockAddLayer, mockRemoveLayer } from '../helper/injectionsTests'
import LMarker from '../../../../src/components/LMarker.vue'

export const createMarkerWrapper = async (props = {}, slots = {}) => {
    const wrapper = mount(LMarker, {
        propsData: {
            latLng: [44.48865, 11.3317],
            ...props
        },
        slots: slots,
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

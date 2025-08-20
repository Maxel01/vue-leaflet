import { LatLng, LatLngBounds } from 'leaflet'
import type { ILayerDefinition } from '@/types/interfaces/ILayerDefinition.ts'
import type { IControlDefinition } from '@/types/interfaces/IControlDefinition.ts'

export interface IMapBlueprint {
    layerControl?: IControlDefinition // TODO: Proper typing, based on argument to registerLayerControl called in LControlLayers.vue
    layersToAdd: ILayerDefinition[] // TODO: Proper typing
    layersInControl: ILayerDefinition[] // TODO: Proper typing
    lastSetBounds?: LatLngBounds
    lastSetCenter?: LatLng
}

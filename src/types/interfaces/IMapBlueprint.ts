import { LatLng, LatLngBounds, Map } from 'leaflet'

export interface IMapBlueprint {
    ready: boolean;
    leafletRef?: Map;
    layerControl?: any; // TODO: Proper typing, based on argument to registerLayerControl called in LControlLayers.vue
    layersToAdd: any[]; // TODO: Proper typing
    layersInControl: any[]; // TODO: Proper typing
    lastSetBounds?: LatLngBounds;
    lastSetCenter?: LatLng;
}

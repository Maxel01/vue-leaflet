import type { LayerType } from '../enums/LayerType.ts'
import { type Layer } from 'leaflet'

export interface ILayerDefinition<T extends Layer = Layer> {
    name?: string;
    layerType?: LayerType;
    visible?: boolean;
    leafletObject: T | undefined;
}

import { Control } from 'leaflet'
import type { ILayerDefinition } from '@/types/interfaces/ILayerDefinition.ts'

export interface IControlDefinition<T extends Control = Control> {
    leafletObject: T
}

export interface ILayerControlDefinition<T extends Control = Control> {
    addLayer(layer: ILayerDefinition): void
    removeLayer(layer: ILayerDefinition): void
    leafletObject: T
}

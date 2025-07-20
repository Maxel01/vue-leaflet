import { Control } from 'leaflet'

export interface IControlDefinition<T extends Control = Control> {
    leafletObject: T;
}

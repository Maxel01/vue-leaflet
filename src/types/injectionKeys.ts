import type { InjectionKey } from "vue";

import type { IControlDefinition, ILayerDefinition } from "./interfaces";
import { Control } from 'leaflet'

export const AddLayerInjection = Symbol("addLayer") as InjectionKey<
    (layer: ILayerDefinition) => void
>;

export const RemoveLayerInjection = Symbol("removeLayer") as InjectionKey<
    (layer: ILayerDefinition) => void
>;

export const RegisterControlInjection = Symbol(
    "registerControl"
) as InjectionKey<(control: IControlDefinition) => void>;

export const RegisterLayerControlInjection = Symbol(
    "registerLayerControl"
) as InjectionKey<(control: IControlDefinition<Control.Layers>) => void>;

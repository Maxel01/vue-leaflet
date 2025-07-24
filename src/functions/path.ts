import type { PathOptions, Path, FillRule, LineJoinShape, LineCapShape } from 'leaflet'
import { onBeforeUnmount, type Ref } from 'vue'

import { RemoveLayerInjection } from '../types/injectionKeys'
import { assertInject, propsToLeafletOptions } from '../utils'

import {
    type InteractiveLayerEmits,
    interactiveLayerPropsDefaults,
    setupInteractiveLayer,
} from './interactiveLayer'
import { type LayerProps } from './layer.ts'

export interface PathProps<T extends PathOptions = PathOptions> extends LayerProps<T> {
    stroke?: boolean
    color?: string
    weight?: number
    opacity?: number
    lineCap?: LineCapShape
    lineJoin?: LineJoinShape
    dashArray?: string
    dashOffset?: string
    fill?: boolean
    fillColor?: string
    fillOpacity?: number
    fillRule?: FillRule
    className?: string
}

export const pathPropsDefaults = {
    ...interactiveLayerPropsDefaults,
    stroke: undefined,
    fill: undefined,
}

export type PathEmits = InteractiveLayerEmits

export const setupPath = (props: PathProps, leafletRef: Ref<Path | undefined>, emit: PathEmits) => {
    const { options: interactiveLayerOptions, methods: interactiveLayerMethods } =
        setupInteractiveLayer(props, leafletRef, emit)

    const options = propsToLeafletOptions<PathOptions>(props, interactiveLayerOptions)

    const removeLayer = assertInject(RemoveLayerInjection)
    const methods = {
        ...interactiveLayerMethods,
        setStroke(stroke: boolean) {
            leafletRef.value?.setStyle({ stroke })
        },
        setColor(color: string) {
            leafletRef.value?.setStyle({ color })
        },
        setWeight(weight: number) {
            leafletRef.value?.setStyle({ weight })
        },
        setOpacity(opacity: number) {
            leafletRef.value?.setStyle({ opacity })
        },
        setLineCap(lineCap: LineCapShape) {
            leafletRef.value?.setStyle({ lineCap })
        },
        setLineJoin(lineJoin: LineJoinShape) {
            leafletRef.value?.setStyle({ lineJoin })
        },
        setDashArray(dashArray: string) {
            leafletRef.value?.setStyle({ dashArray })
        },
        setDashOffset(dashOffset: string) {
            leafletRef.value?.setStyle({ dashOffset })
        },
        setFill(fill: boolean) {
            leafletRef.value?.setStyle({ fill })
        },
        setFillColor(fillColor: string) {
            leafletRef.value?.setStyle({ fillColor })
        },
        setFillOpacity(fillOpacity: number) {
            leafletRef.value?.setStyle({ fillOpacity })
        },
        setFillRule(fillRule: FillRule) {
            leafletRef.value?.setStyle({ fillRule })
        },
        setClassName(className: string) {
            leafletRef.value?.setStyle({ className })
        },
    }

    onBeforeUnmount(() => {
        removeLayer({ leafletObject: leafletRef.value })
    })

    return { options, methods }
}

import type { FillRule, LineCapShape, LineJoinShape, Path, PathOptions } from 'leaflet'
import { onBeforeUnmount, type Ref } from 'vue'

import { RemoveLayerInjection } from '@/types/injectionKeys'
import { assertInject, propsToLeafletOptions } from '@/utils'

import {
    type InteractiveLayerEmits,
    type InteractiveLayerProps,
    interactiveLayerPropsDefaults,
    setupInteractiveLayer,
} from './interactiveLayer'

export interface PathProps<T extends PathOptions = PathOptions> extends InteractiveLayerProps<T> {
    /**
     * Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
     * @reactive
     */
    stroke?: boolean
    /**
     * Stroke color
     * @reactive
     */
    color?: string
    /**
     * Stroke width in pixels
     * @reactive
     */
    weight?: number
    /**
     * Stroke opacity
     * @reactive
     */
    opacity?: number
    /**
     * A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
     * @reactive
     */
    lineCap?: LineCapShape
    /**
     * A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
     * @reactive
     */
    lineJoin?: LineJoinShape
    /**
     * A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray).
     * @reactive
     */
    dashArray?: string
    /**
     * A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset).
     * @reactive
     */
    dashOffset?: string
    /**
     * Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
     * @reactive
     */
    fill?: boolean
    /**
     * Fill color
     * @reactive
     */
    fillColor?: string
    /**
     * Fill opacity
     * @reactive
     */
    fillOpacity?: number
    /**
     * A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
     * @reactive
     */
    fillRule?: FillRule
    /**
     * Custom class name set on an element. Only for SVG renderer.
     * @reactive
     */
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
    return { options, methods }
}

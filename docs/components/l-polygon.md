---
outline: deep
---

# LPolygon

> Easily draw a polygon on the map

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <PolygonDemo />
</div>

```vue{12-23}
<!--@include: ../../src/playground/views/PolygonDemo.vue -->
```

## Props

This component does not have any specific props.

### Inherited props
<details>
<summary>from <strong>PolylineProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| latLngs | Array of coordinates objects that represent the polyline. | `Array` | `true` | `-` | `true` |
| noClip | Disable polyline clipping. | `boolean` | `true` | `-` | `false` |
| smoothFactor | How much to simplify the polyline on each zoom level. More means better performance and smoother looks, and less means more accurate representation. | `number` | `true` | `-` | `false` |

</details>

<details>
<summary>from <strong>PathProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| stroke | Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles. | `boolean` | `true` | `-` | `false` |
| color | Stroke color | `string` | `true` | `-` | `false` |
| weight | Stroke width in pixels | `number` | `true` | `-` | `false` |
| opacity | Stroke opacity | `number` | `true` | `-` | `false` |
| lineCap | A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke. | `LineCapShape` | `true` | `-` | `false` |
| lineJoin | A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke. | `LineJoinShape` | `true` | `-` | `false` |
| dashArray | A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). | `string` | `true` | `-` | `false` |
| dashOffset | A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). | `string` | `true` | `-` | `false` |
| fill | Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles. | `boolean` | `true` | `-` | `false` |
| fillColor | Fill color | `string` | `true` | `-` | `false` |
| fillOpacity | Fill opacity | `number` | `true` | `-` | `false` |
| fillRule | A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined. | `FillRule` | `true` | `-` | `false` |
| className | Custom class name set on an element. Only for SVG renderer. | `string` | `true` | `-` | `false` |

</details>

<details>
<summary>from <strong>InteractiveLayerProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| bubblingMouseEvents | When `true`, a pointer event on this path will trigger the same event on the map (unless [DomEvent.stopPropagation](https://leafletjs.com/reference-2.0.0.html#domevent-stoppropagation) is used). | `boolean` | `initOnly` | `-` | `false` |
| interactive | If `false`, the layer will not emit pointer events and will act as a part of the underlying map. | `boolean` | `initOnly` | `-` | `false` |

</details>

<details>
<summary>from <strong>LayerProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| pane | By default, the layer will be added to the map's [overlay pane](https://leafletjs.com/reference-2.0.0.html#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default. Not effective if the renderer option is set (the renderer option will override the pane option). | `string` | `initOnly` | `-` | `false` |
| attribution | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. | `string` | `true` | `-` | `false` |
| name | - | `string` | `true` | `-` | `false` |
| layerType | - | `LayerType` | `true` | `-` | `false` |
| visible | - | `boolean` | `true` | `-` | `false` |

</details>

<details>
<summary>from <strong>ComponentProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| options | Leaflet options to pass to the component constructor. | `T` | `initOnly` | `-` | `false` |

</details>

## Emits

| Event | Arguments | Description |
| --- | --- | --- |
| `update:visible` | `boolean` | Triggers when the visible prop needs to be updated |
| `ready` | `T` | Triggers when the component is ready |

## Slots

| Name | Description |
| --- | --- |
| `default` | Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LPolygon`. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<Polygon \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


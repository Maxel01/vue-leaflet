---
outline: deep
---

# LMarker

> Used to display clickable/draggable markers on the map.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <MarkerDemo />
</div>

```vue{5,15}
<!--@include: ../../src/playground/views/MarkerDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| draggable | Whether the marker is draggable with mouse/touch or not. | `boolean` | `initOnly` | `-` | `false` |
| icon | Icon instance to use for rendering the marker. See [Icon documentation](/components/l-icon.html) for details on how to customize the marker icon. If not specified, a common instance of [Icon.Default](https://leafletjs.com/reference-2.0.0.html#icon-default) is used. | `Icon` | `true` | `-` | `false` |
| zIndexOffset | By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like 1000 (or high negative value, respectively). | `number` | `true` | `-` | `false` |
| latLng | The position of the marker | `LatLngExpression` | `true` | `-` | `true` |

### Inherited props
<details>
<summary>from <strong>LayerProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| visible | - | `boolean` | `true` | `-` | `false` |
| layerType | - | `LayerType` | `true` | `-` | `false` |
| name | - | `string` | `true` | `-` | `false` |
| attribution | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. | `string` | `true` | `-` | `false` |
| pane | By default, the layer will be added to the map's [overlay pane](https://leafletjs.com/reference-2.0.0.html#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default. Not effective if the renderer option is set (the renderer option will override the pane option). | `string` | `initOnly` | `-` | `false` |

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
| `ready` | `Marker` | Triggers when the component is ready |
| `update:latLng` | `LatLngExpression` | Triggers when the latLng prop needs to be updated |
| `update:lat-lng` | `LatLngExpression` | Triggers when the latLng prop needs to be updated |

## Slots

| Name | Description |
| --- | --- |
| `default` | Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LMarker`. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<Marker \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


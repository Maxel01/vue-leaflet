---
outline: deep
---

# LGeoJson

> Represents a GeoJSON object or an array of GeoJSON objects.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <GeoJsonDemo />
</div>

```vue{5-8,11-14,25}
<!--@include: ../../src/playground/views/GeoJsonDemo.vue -->
```

## Props

<details>
<summary>from <strong>Unknown</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| visible | - | `boolean` | `true` | `-` | `false` |
| layerType | - | `LayerType` | `true` | `-` | `false` |
| name | - | `string` | `true` | `-` | `false` |
| attribution | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. | `string` | `true` | `-` | `false` |
| pane | By default, the layer will be added to the map's [overlay pane](https://leafletjs.com/reference-2.0.0.html#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default. Not effective if the renderer option is set (the renderer option will override the pane option). | `string` | `initOnly` | `-` | `false` |
| options | Leaflet options to pass to the component constructor. | `T` | `initOnly` | `-` | `false` |
| geojson | An object in GeoJSON format to display on the map (you can alternatively add it later with addData method). | `GeoJsonObject` | `true` | `-` | `false` |
| optionsStyle | A Function defining the styling for GeoJSON lines and polygons. See more in [original Leaflet documentation](https://leafletjs.com/reference-2.0.0.html#geojson-style) | `StyleFunction` | `true` | `-` | `false` |

</details>

## Emits

| Event | Arguments | Description |
| --- | --- | --- |
| `update:visible` | `boolean` | Triggers when the visible prop needs to be updated |
| `ready` | `T` | Triggers when the component is ready |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<GeoJSON \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


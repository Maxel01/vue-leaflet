---
outline: deep
---

# LTileLayer

> Load tiles from a map server and display them accordingly to map zoom, center and size.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <TileLayerDemo />
</div>

```vue{7-19}
<!--@include: ../../src/playground/views/TileLayerDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| tms | If `true`, inverses Y axis numbering for tiles (turn this on for TMS services) | `boolean` | `?` | `-` | `false` |
| subdomains | Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings. | `string \| Array` | `?` | `-` | `false` |
| detectRetina | If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution. | `boolean` | `initOnly` | `-` | `false` |
| url | A string of the form `'https://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'`. See more in the [original Leaflet documentation](https://leafletjs.com/reference-2.0.0.html#tilelayer) | `string` | `true` | `-` | `true` |

### Inherited props
<details>
<summary>from <strong>GridLayerAbstractProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| className | A custom class name to assign to the tile layer. Empty by default. | `string` | `initOnly` | `-` | `false` |
| maxZoom | The maximum zoom level up to which this layer will be displayed (inclusive) | `number` | `initOnly` | `-` | `false` |
| minZoom | The minimum zoom level down to which this layer will be displayed (inclusive) | `number` | `initOnly` | `-` | `false` |
| noWrap | Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the [map CRS](https://leafletjs.com/reference-2.0.0.html#map-crs) doesn't wrap around. Can be used in combination with `bounds` to prevent requesting tiles outside the CRS limits. | `boolean` | `initOnly` | `-` | `false` |
| tileSize | Width and height of tiles in the grid. Use a number if width and height are equal, or `Point(width, height)` otherwise. | `number \| PointExpression` | `initOnly` | `-` | `false` |
| zIndex | The explicit zIndex of the tile layer | `number` | `true` | `-` | `false` |
| opacity | Opacity of the tiles. Can be used in the createTile() function. | `number` | `true` | `-` | `false` |

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

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `leafletObject` | `Ref<TileLayer \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


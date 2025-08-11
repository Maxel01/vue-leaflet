---
outline: deep
---

# LGridLayer

> Creates a map layer where each tile is an instantiated Vue component.
> Each tile component is given `coords` props by `LGridLayer` to indicate
> the zoom level and position of the tile
> (see https://leafletjs.com/examples/extending/extending-2-layers.html#lgridlayer-and-dom-elements).

::: warning

From [Vue Leaflet legacy v1](https://github.com/vue-leaflet/vue-leaflet/blob/master/src/playground/views/GridLayerDemo.vue) :

TODO NEXT: While sorting out type errors in LGridLayer.vue, I realized I'm not sure
how or even if its infrastructure is particularly used well. In Vue2Leaflet,
you could pass an arbitrary Vue component to the LGridLayer, to be rendered
for each tile with its coords passed as props. But that doesn't seem set up here.
Should we replicate V2L exactly here? Set things up so that the LGridLayer's $slot
can be where/how the component is setup/configured/passed/added? Simply stick with
the `childRender` prop and simplify some of the logic in LGridLayer.vue?
:::

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <GridLayerDemo />
</div>

```vue{5-11,17}
<!--@include: ../../src/playground/views/GridLayerDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| childRender | - | `VueGridLayerTileRenderer` | `initOnly` | `-` | `true` |
| --- | --- | --- | --- | --- | --- |
| className | A custom class name to assign to the tile layer. Empty by default. | `string` | `initOnly` | `-` | `false` |
| maxZoom | The maximum zoom level up to which this layer will be displayed (inclusive) | `number` | `initOnly` | `-` | `false` |
| minZoom | The minimum zoom level down to which this layer will be displayed (inclusive) | `number` | `initOnly` | `-` | `false` |
| noWrap | Whether the layer is wrapped around the antimeridian. If true, the GridLayer will only be displayed once at low zoom levels. Has no effect when the [map CRS](https://leafletjs.com/reference-2.0.0.html#map-crs) doesn't wrap around. Can be used in combination with `bounds` to prevent requesting tiles outside the CRS limits. | `boolean` | `initOnly` | `-` | `false` |
| tileSize | Width and height of tiles in the grid. Use a number if width and height are equal, or `Point(width, height)` otherwise. | `number \| PointExpression` | `initOnly` | `-` | `false` |
| zIndex | The explicit zIndex of the tile layer | `number` | `true` | `-` | `false` |
| opacity | Opacity of the tiles. Can be used in the createTile() function. | `number` | `true` | `-` | `false` |

### Inherited props
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
| `leafletObject` | `Ref<GridLayer \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element. ? |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |


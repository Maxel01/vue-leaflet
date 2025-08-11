---
outline: deep
---

# LControlLayers

> The layers control gives users the ability to switch between different base layers and switch overlays on/off.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <ControlLayersDemo />
</div>

```vue{18}
<!--@include: ../../src/playground/views/ControlLayersDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| collapsed | If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation. | `boolean` | `initOnly` | `-` | `false` |
| autoZIndex | If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off. | `boolean` | `initOnly` | `-` | `false` |
| hideSingleBase | If `true`, the base layers in the control will be hidden when there is only one. | `boolean` | `initOnly` | `-` | `false` |
| sortLayers | Whether to sort the layers. When `false`, layers will keep the order in which they were added to the control. | `boolean` | `initOnly` | `-` | `false` |
| sortFunction | A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) that will be used for sorting the layers, when `sortLayers` is `true`. The function receives both the [L.Layer](https://leafletjs.com/reference-2.0.0.html#layer) instances and their names, as in `sortFunction(layerA, layerB, nameA, nameB)`. By default, it sorts layers alphabetically by their name. | `TSFunctionType` | `initOnly` | `-` | `false` |

### Inherited props
<details>
<summary>from <strong>ControlAbstractProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| position | The position of the control (one of the map corners). Possible values are `topleft`, `topright`, `bottomleft` or `bottomright`. | `ControlPosition` | `true` | `-` | `false` |

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
| `ready` | `T` | Triggers when the component is ready |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `leafletObject` | `Ref<Control.Layers \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


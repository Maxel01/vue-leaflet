---
outline: deep
---

# LFeatureGroup

> Extended [LLayerGroup](/components/l-layer-group.html) that makes it easier to do the same thing to all its member layers.

::: warning
This still needs better documentation and examples.
:::

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <FeatureGroupDemo />
</div>

```vue{12-14}
<!--@include: ../../src/playground/views/FeatureGroupDemo.vue -->
```

## Props

This component does not have any specific props.

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

## Slots

| Name | Description |
| --- | --- |
| `default` | ? |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<FeatureGroup \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


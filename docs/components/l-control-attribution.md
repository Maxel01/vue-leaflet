---
outline: deep
---

# LControlAttribution

> The attribution control allows you to display attribution data in a small text bos on a map.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <ControlAttributionDemo />
</div>

```vue{5,15}
<!--@include: ../../src/playground/views/ControlAttributionDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| prefix | The HTML text shown before the attributions. Pass `false` to disable. | `string \| false` | `true` | `-` | `false` |

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
| `leafletObject` | `Ref<Control.Attribution \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


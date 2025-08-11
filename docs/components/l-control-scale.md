---
outline: deep
---

# LControlScale

> A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <ControlScaleDemo />
</div>

```vue{12}
<!--@include: ../../src/playground/views/ControlScaleDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| maxWidth | Maximum width of the control in pixels. The width is set dynamically to show round values (eg. 100, 200, 500). | `number` | `initOnly` | `-` | `false` |
| metric | Whether to show the metric scale line (m/km). | `boolean` | `initOnly` | `-` | `false` |
| imperial | Whether to show the imperial scale line (mi/ft). | `boolean` | `initOnly` | `-` | `false` |
| updateWhenIdle | If `true`, the control is updated on [moveend](https://leafletjs.com/reference-2.0.0html#map-moveend), otherwise it's always up-to-date (updated on [move](https://leafletjs.com/reference.html#map-move)). | `boolean` | `initOnly` | `-` | `false` |

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
| `leafletObject` | `Ref<Control.Scale \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


---
outline: deep
---

# LControlZoom

> A basic zoom control with two buttons (zoom in and zoom out).

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <ControlZoomDemo />
</div>

```vue{12}
<!--@include: ../../src/playground/views/ControlZoomDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| zoomInText | The text set on the 'zoom in' button | `string` | `initOnly` | `-` | `false` |
| zoomInTitle | The title set on the 'zoom in' button | `string` | `initOnly` | `-` | `false` |
| zoomOutText | The text set on the 'zoom out' button | `string` | `initOnly` | `-` | `false` |
| zoomOutTitle | The title set on the 'zoom out' button | `string` | `initOnly` | `-` | `false` |

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
| `leafletObject` | `Ref<Control.Zoom \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


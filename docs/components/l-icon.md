---
outline: deep
---

# LIcon

> Easy and reactive way to configure the icon of a marker

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <IconDemo />
</div>

```vue{6-21,34,39,44,49}
<!--@include: ../../src/playground/views/IconDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| iconUrl | The URL to the icon image (absolute or relative to your script path). | `string` | `true` | `-` | `false` |
| iconRetinaUrl | The URL to a retina sized version of the icon image (absolute or relative to your script path). Used for Retina screen devices. | `string` | `true` | `-` | `false` |
| iconSize | Size of the icon image in pixels. | `PointExpression` | `true` | `-` | `false` |
| iconAnchor | The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins. | `PointExpression` | `true` | `-` | `false` |
| popupAnchor | The coordinates of the point from which popups will "open", relative to the icon anchor | `PointExpression` | `true` | `-` | `false` |
| tooltipAnchor | The coordinates of the point from which tooltips will "open", relative to the icon anchor | `PointExpression` | `true` | `-` | `false` |
| shadowUrl | The URL to the icon shadow image. If not specified, no shadow image will be created | `string` | `true` | `-` | `false` |
| shadowRetinaUrl | - | `string` | `true` | `-` | `false` |
| shadowSize | Size of the shadow image in pixels | `PointExpression` | `true` | `-` | `false` |
| shadowAnchor | The coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified) | `PointExpression` | `true` | `-` | `false` |
| bgPos | - | `PointExpression` | `true` | `-` | `false` |
| className | A custom class name to assign to both icon and shadow images. Empty by default. | `string` | `true` | `-` | `false` |

### Inherited props
<details>
<summary>from <strong>ComponentProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| options | Leaflet options to pass to the component constructor. | `T` | `initOnly` | `-` | `false` |

</details>

## Slots

| Name | Description |
| --- | --- |
| `default` | Slot content will be rendered inside the Leaflet icon container. Use this slot to inject custom HTML or Vue components into the icon, such as labels, SVGs, or interactive elements. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element. |


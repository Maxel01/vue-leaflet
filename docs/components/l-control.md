---
outline: deep
---

# LControl

> Base component for implementing map controls. Handles positioning. All other controls extend from this component.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <ControlDemo />
</div>

```vue{4-6,17-23}
<!--@include: ../../src/playground/views/ControlDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| disableClickPropagation | Adds stopPropagation to the element's `click`, `dblclick`, `contextmenu` and `pointerdown` events (plus browser variants). | `boolean` | `initOnly` | `-` | `false` |
| disableScrollPropagation | Adds stopPropagation to the element's `wheel` events (plus browser variants). | `boolean` | `initOnly` | `-` | `false` |
| --- | --- | --- | --- | --- | --- |
| position | The position of the control (one of the map corners). Possible values are `topleft`, `topright`, `bottomleft` or `bottomright`. | `ControlPosition` | `true` | `-` | `false` |

### Inherited props
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

## Slots

| Name | Description |
| --- | --- |
| `default` | Content to be rendered inside the Leaflet control's container. This slot replaces the default content and allows full customization of the control's appearance. The content will be injected into the control's root DOM element. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element of the Leaflet control. This element is managed by Leaflet's `Control` class. You can use it to directly manipulate the control's container (e.g. styling, event listeners), or alternatively use the default slot for custom content. |
| `leafletObject` | `Ref<Control \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


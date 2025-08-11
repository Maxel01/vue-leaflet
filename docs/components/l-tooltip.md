---
outline: deep
---

# LTooltip

> Display a tooltip on the map

::: tip
Tooltip placed inside a marker will by default appear on marker hover.
:::

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <TooltipDemo />
</div>

```vue{25,29,34,41,56,66,79,87}
<!--@include: ../../src/playground/views/TooltipDemo.vue -->
```

## Props

<details>
<summary>from <strong>Unknown</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| options | Leaflet options to pass to the component constructor. | `T` | `initOnly` | `-` | `false` |
| content | Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a String or HTMLElement to be used in the overlay. | `union` | `true` | `-` | `false` |

</details>

## Emits

| Event | Arguments | Description |
| --- | --- | --- |
| `ready` | `Tooltip` | Triggers when the component is ready |

## Slots

| Name | Description |
| --- | --- |
| `default` | Content to be rendered inside the Leaflet tooltip's container. This slot replaces the default content and allows full customization of the tooltip's appearance. The content will be injected into the tooltip's root DOM element. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element of the Leaflet tooltip. This element is managed by Leaflet's `Tooltip` class. You can use it to directly manipulate the tooltip's container (e.g. styling, event listeners), or alternatively use the default slot for custom content. |
| `leafletObject` | `Ref<Tooltip \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


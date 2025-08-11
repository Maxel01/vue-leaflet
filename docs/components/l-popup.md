---
outline: deep
---

# LPopup

> Display a popup on the map

::: tip
Popup placed inside a marker will by default appear on marker click.
:::

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <PopupDemo />
</div>

```vue{25,30,46,56,69,77}
<!--@include: ../../src/playground/views/PopupDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| latLng | The position of the popup | `LatLngExpression` | `true` | `-` | `false` |

### Inherited props
<details>
<summary>from <strong>PopperProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| content | Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a String or HTMLElement to be used in the overlay. | `string \| HTMLElement` | `true` | `-` | `false` |

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
| `ready` | `Tooltip` | Triggers when the component is ready |

## Slots

| Name | Description |
| --- | --- |
| `default` | Content to be rendered inside the Leaflet popup's container. This slot replaces the default content and allows full customization of the popup's appearance. The content will be injected into the popup's root DOM element. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element of the Leaflet popup. This element is managed by Leaflet's `Popup` class. You can use it to directly manipulate the popup's container (e.g. styling, event listeners), or alternatively use the default slot for custom content. |
| `leafletObject` | `Ref<Popup \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


---
outline: deep
---

# LVideoOverlay

> Used to load and display a video over specific bounds of the map.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <VideoOverlayDemo />
</div>

```vue{4-8,13-18}
<!--@include: ../../src/playground/views/VideoOverlayDemo.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| video | Url of the video, urls of the videos or a video Element | `string \| Array \| HTMLVideoElement` | `initOnly` | `-` | `true` |

### Inherited props
<details>
<summary>from <strong>ImageOverlayAbstractProps</strong></summary>

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| bounds | The geographical bounds | `LatLngBoundsExpression` | `true` | `-` | `true` |
| className | A custom class name to assign to the image. Empty by default. | `string` | `initOnly` | `-` | `false` |
| zIndex | The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer. | `number` | `true` | `-` | `false` |
| errorOverlayUrl | URL to the overlay image to show in place of the overlay that failed to load. | `string` | `initOnly` | `-` | `false` |
| crossOrigin | Whether the crossOrigin attribute will be added to the image. If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data. Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values. | `boolean` | `initOnly` | `-` | `false` |
| interactive | If `true`, the image overlay will emit [mouse events](https://leafletjs.com/reference-2.0.0.html#interactive-layer) when clicked or hovered | `boolean` | `initOnly` | `-` | `false` |
| alt | Text for the alt attribute of the image (useful for accessibility). | `string` | `initOnly` | `-` | `false` |
| opacity | The opacity of the image overlay. | `number` | `true` | `-` | `false` |

</details>

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
| `default` | Used to inject Leaflet child components like `<LPopup>` or `<LTooltip>` into the `LCircleMarker`. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<VideoOverlay \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |


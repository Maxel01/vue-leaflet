---
outline: deep
---

# LMap

> Base component, contains and wraps all the other components.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <DemoHome />
</div>

```vue{5,9-15}
<!--@include: ../../src/playground/views/DemoHome.vue -->
```

## Props

| Prop name | Description | Type | Reactive | Default | Required |
| --- | --- | --- | --- | --- | --- |
| width | The width of the map | `string` | `true` | `-` | `false` |
| height | The height of the map | `string` | `true` | `-` | `false` |
| center | The center of the map, supports `v-model` | `PointExpression` | `true` | `-` | `false` |
| bounds | The bounds of the map, supports `v-model` | `LatLngBounds` | `true` | `-` | `false` |
| maxBounds | The max bounds of the map | `LatLngBounds` | `true` | `-` | `false` |
| zoom | The zoom of the map, supports `v-model` | `number` | `true` | `-` | `false` |
| minZoom | The minZoom of the map | `number` | `true` | `-` | `false` |
| maxZoom | The maxZoom of the map | `number` | `true` | `-` | `false` |
| paddingBottomRight | The paddingBottomRight of the map | `PointExpression` | `true` | `-` | `false` |
| paddingTopLeft | The paddingTopLeft of the map | `PointExpression` | `true` | `-` | `false` |
| padding | The padding of the map | `PointExpression` | `true` | `-` | `false` |
| worldCopyJump | With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible. | `boolean` | `initOnly` | `-` | `false` |
| crs | The [Coordinate Reference System](https://leafletjs.com/reference-2.0.0.html#crs) to use. Don't change this if you're not sure what it means. | `CRS \| TSTypeQuery` | `true` | `-` | `false` |
| maxBoundsViscosity | If `maxBounds` is set, this option will control how solid the bounds are when dragging the map around. The default value of `0.0` allows the user to drag outside the bounds at normal speed, higher values will slow down map dragging outside bounds, and `1.0` makes the bounds fully solid, preventing the user from dragging outside the bounds. | `number` | `initOnly` | `-` | `false` |
| inertia | If enabled, panning of the map will have an inertia effect where the map builds momentum while dragging and continues moving in the same direction for some time. Feels especially nice on touch devices. Enabled by default. | `boolean` | `initOnly` | `-` | `false` |
| inertiaDeceleration | The rate with which the inertial movement slows down, in pixels/second². | `number` | `initOnly` | `-` | `false` |
| inertiaMaxSpeed | Max speed of the inertial movement, in pixels/second. | `number` | `initOnly` | `-` | `false` |
| easeLinearity | The curvature factor of panning animation easing (third parameter of the [Cubic Bezier curve](https://cubic-bezier.com/)). 1.0 means linear animation, and the smaller this number, the more bowed the curve. | `number` | `initOnly` | `-` | `false` |
| zoomAnimation | Whether the map zoom animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android. | `boolean` | `initOnly` | `-` | `false` |
| zoomAnimationThreshold | Won't animate zoom if the zoom difference exceeds this value. | `number` | `initOnly` | `-` | `false` |
| fadeAnimation | Whether the tile fade animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android. | `boolean` | `initOnly` | `-` | `false` |
| markerZoomAnimation | Whether markers animate their zoom with the zoom animation, if disabled they will disappear for the length of the animation. By default, it's enabled in all browsers that support CSS3 Transitions except Android. | `boolean` | `initOnly` | `-` | `false` |
| noBlockingAnimations | Whether blocking animations are allowed or not (primarily for [ZoomPanOptions](https://leafletjs.com/reference-2.0.0.html#zoom/pan-options) ? | `boolean` | `initOnly` | `-` | `false` |
| beforeMapMount | - | `TSFunctionType` | `initOnly` | `-` | `false` |

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
| `ready` | `Map` | Triggers when the component is ready |
| `update:zoom` | `number` | Triggers when the map's zoom level changes. |
| `update:center` | `LatLng` | Triggers when the map's center coordinates are updated. |
| `update:bounds` | `LatLngBounds` | Triggers when the map's visible bounds are updated. |

## Slots

| Name | Description |
| --- | --- |
| `default` | The default slot is rendered inside the map container and is used to embed layer components, controls, or any custom Vue components. Common usage includes placing `LTileLayer`, `LMarker`, `LPopup`, `LFeatureGroup`, or other Leaflet-related elements that interact with the map. |

## Exposes

| Name | Type | Description |
| --- | --- | --- |
| `root` | `Ref<HTMLElement \| undefined>` | The root DOM element of the Leaflet map. This element is used to create the Leaflet's `Map` class. You can use it to directly manipulate the map's container (e.g. styling, event listeners). |
| `ready` | `Ref<boolean>` | Indicates whether the component and its underlying Leaflet object are fully initialized. |
| `leafletObject` | `Ref<Map \| undefined>` | The underlying Leaflet instance. Can be used to directly interact with the Leaflet API (e.g. calling methods or accessing internal state). |
| `attrs` | `-` | - |


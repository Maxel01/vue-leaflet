---
outline: deep
---

# LMap

> Base component, contains and wraps all the other components.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from '../../src/lib.ts';
import { onMounted } from 'vue';
</script>

<LMap style="height: 350px" :zoom="6" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
</LMap>

```vue
<LMap style="height: 350px" :zoom="6" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
</LMap>
```

## Props

| Prop name              | Description                                                                                                                                                                                                                                                                                                                                           | Type                                                              | Required 
| ---------------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------| -------- 
| center                 | The center of the map, supports `v-model`                                                                                                                                                                                                                                                                                                             | [PointExpression](https://leafletjs.com/reference.html#point)     | -
| bounds                 | The bounds of the map, supports `v-model`                                                                                                                                                                                                                                                                                                             | [LatLngBounds](https://leafletjs.com/reference.html#latlngbounds) | -        
| maxBounds              | The max bounds of the map                                                                                                                                                                                                                                                                                                                             | [LatLngBounds](https://leafletjs.com/reference.html#latlngbounds) | -        
| zoom                   | The zoom of the map, supports `v-model`                                                                                                                                                                                                                                                                                                               | Number                                                            | -        
| minZoom                | The minZoom of the map                                                                                                                                                                                                                                                                                                                                | Number                                                            | -        
| maxZoom                | The maxZoom of the map                                                                                                                                                                                                                                                                                                                                | Number                                                            | -        
| paddingBottomRight     | The paddingBottomRight of the map                                                                                                                                                                                                                                                                                                                     | [PointExpression](https://leafletjs.com/reference.html#point)     | -        
| paddingTopLeft         | The paddingTopLeft of the map                                                                                                                                                                                                                                                                                                                         | [PointExpression](https://leafletjs.com/reference.html#point)     | -        
| padding                | The padding of the map                                                                                                                                                                                                                                                                                                                                | [PointExpression](https://leafletjs.com/reference.html#point)     | -        
| worldCopyJump          | With this option enabled, the map tracks when you pan to another "copy" of the world and seamlessly jumps to the original one so that all overlays like markers and vector layers are still visible.                                                                                                                                                  | Boolean                                                           | -        
| crs                    | The [Coordinate Reference System](https://leafletjs.com/reference-2.0.0.html#crs) to use. Don't change this if you're not sure what it means.                                                                                                                                                                                                         | [CRS](https://leafletjs.com/reference.html#map-crs)               | -        
| maxBoundsViscosity     | If `maxBounds` is set, this option will control how solid the bounds are when dragging the map around. The default value of `0.0` allows the user to drag outside the bounds at normal speed, higher values will slow down map dragging outside bounds, and `1.0` makes the bounds fully solid, preventing the user from dragging outside the bounds. | Number                                                            | -        
| inertia                | If enabled, panning of the map will have an inertia effect where the map builds momentum while dragging and continues moving in the same direction for some time. Feels especially nice on touch devices. Enabled by default.                                                                                                                         | Boolean                                                           | -        
| inertiaDeceleration    | The rate with which the inertial movement slows down, in pixels/second².                                                                                                                                                                                                                                                                              | Number                                                            | -        
| inertiaMaxSpeed        | Max speed of the inertial movement, in pixels/second.                                                                                                                                                                                                                                                                                                 | Number                                                            | -        
| easeLinearity          | The curvature factor of panning animation easing (third parameter of the [Cubic Bezier curve](https://cubic-bezier.com/)). 1.0 means linear animation, and the smaller this number, the more bowed the curve.                                                                                                                                                                      | Number                                                            | -        
| zoomAnimation          | Whether the map zoom animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.                                                                                                                                                                                                                      | Boolean                                                           | -        
| zoomAnimationThreshold | Won't animate zoom if the zoom difference exceeds this value.                                                                                                                                                                                                                                                                                         | Number                                                            | -        
| fadeAnimation          | Whether the tile fade animation is enabled. By default it's enabled in all browsers that support CSS3 Transitions except Android.                                                                                                                                                                                                                     | Boolean                                                           | -        
| markerZoomAnimation    | Whether markers animate their zoom with the zoom animation, if disabled they will disappear for the length of the animation. By default it's enabled in all browsers that support CSS3 Transitions except Android.                                                                                                                                    | Boolean                                                           | -        
| noBlockingAnimations   | Whether blocking animations are allowed or not (primarily for [ZoomPanOptions](https://leafletjs.com/reference-2.0.0.html#zoom/pan-options) ?                                                                                                                                                                                                         | Boolean                                                           | -        

### Inherited props

<!--@include: ./props/component-props.md-->

## Events

| Event name    | Type                                                                    | Description                          |
| ------------- |-------------------------------------------------------------------------| ------------------------------------ |
| ready         | [Map](https://leafletjs.com/reference-2.0.0.html#map)                   | Triggers when the component is ready |
| update:zoom   | Number                                                                  | Triggers when zoom is updated        |
| update:center | [LatLng](https://leafletjs.com/reference-2.0.0.html#latlng)             | Triggers when center is updated      |
| update:bounds | [LatLngBounds](https://leafletjs.com/reference-2.0.0.html#latlngbounds) | Triggers when bounds are updated     |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
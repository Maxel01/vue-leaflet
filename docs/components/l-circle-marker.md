---
outline: deep
---

# LCircleMarker

> A circle of a fixed size with radius specified in pixels.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LCircleMarker } from '../../src/lib.ts';
import { onMounted } from 'vue';

onMounted(() => {
  import('leaflet')
})
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LCircleMarker
    :lat-lng="[47.21322, -1.559482]"
    :radius="6"
    :color="'red'"
  />
</LMap>

```vue{8-12}
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LCircleMarker
    :lat-lng="[47.21322, -1.559482]"
    :radius="6"
    :color="'red'"
  />
</LMap>
```

<!--@include: ../gen/components/LCircleMarker.md-->

## Events

| Event name     | Type         | Description                                        |
| -------------- |--------------| -------------------------------------------------- |
| update:visible | boolean      | Triggers when the visible prop needs to be updated |
| ready          | [CircleMarker](https://leafletjs.com/reference-2.0.0.html#circlemarker) | Triggers when the component is ready               |

## Slots

| Name    | Description | Bindings |
| ------- | ----------- | -------- |
| default |             |          |
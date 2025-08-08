---
outline: deep
---

# LRectangle

> Easily draw a rectangle on the map

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LRectangle } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />

<LRectangle
:lat-lngs="[
[47.334852, -1.509485],
[47.342596, -1.328731],
[47.241487, -1.190568],
[47.234787, -1.358337],
[47.294733, -1.234567],
]"
:fill="true"
color="#35495d"
/>

<LRectangle
:bounds="[
[47.5, -1],
[47.6, -1.1],
]"
/>
</LMap>

```vue{9-19,21-26}
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />

  <LRectangle
    :lat-lngs="[
      [47.334852, -1.509485],
      [47.342596, -1.328731],
      [47.241487, -1.190568],
      [47.234787, -1.358337],
      [47.294733, -1.234567],
    ]"
    :fill="true"
    color="#35495d"
  />

  <LRectangle
    :bounds="[
      [47.5, -1],
      [47.6, -1.1],
    ]"
  />
</LMap>
```

<!--@include: ../gen/components/LRectangle.md-->

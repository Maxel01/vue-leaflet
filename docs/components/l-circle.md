---
outline: deep
---

# LCircle

> Draw a path in the shape of a circle around a center positioned at `latLng` coordinates.

> It's an approximation and starts to diverge from a real circle closer to the poles (due to projection distortion).

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LCircle } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LCircle
    :lat-lng="[47.21322, -1.559482]"
    :radius="4500"
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
  <LCircle
    :lat-lng="[47.21322, -1.559482]"
    :radius="4500"
    :color="'red'"
  />
</LMap>
```

<!--@include: ../gen/components/LCircle.md-->

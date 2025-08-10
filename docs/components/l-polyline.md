---
outline: deep
---

# LPolyline

> Easily draw a polyline on the map

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPolyline } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LPolyline
    :lat-lngs="[
      [47.334852, -1.509485],
      [47.342596, -1.328731],
      [47.241487, -1.190568],
      [47.234787, -1.358337],
    ]"
    color="green"
  />
</LMap>

```vue{8-16}
<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LPolyline
    :lat-lngs="[
      [47.334852, -1.509485],
      [47.342596, -1.328731],
      [47.241487, -1.190568],
      [47.234787, -1.358337],
    ]"
    color="green"
  />
</LMap>
```

<!--@include: ../gen/components/LPolyline.md-->
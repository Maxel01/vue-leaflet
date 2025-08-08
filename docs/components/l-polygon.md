---
outline: deep
---

# LPolygon

> Easily draw a polygon on the map

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LPolygon } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LPolygon
    :lat-lngs="[
      [25.774, -80.19],
      [18.466, -66.118],
      [32.321, -64.757],
      [25.774, -80.19],
    ]"
    color="#41b782"
    :fill="true"
    :fillOpacity="0.5"
    fillColor="#41b782"
  />
</LMap>

```vue{8-19}
<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LPolygon
    :lat-lngs="[
      [25.774, -80.19],
      [18.466, -66.118],
      [32.321, -64.757],
      [25.774, -80.19],
    ]"
    color="#41b782"
    :fill="true"
    :fillOpacity="0.5"
    fillColor="#41b782"
  />
</LMap>
```

<!--@include: ../gen/components/LPolygon.md-->

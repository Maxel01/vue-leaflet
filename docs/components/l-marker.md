---
outline: deep
---

# LMarker

> Used to display clickable/draggable markers on the map.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LMarker :lat-lng="[50, 50]" draggable />
</LMap>

```vue
<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LMarker :lat-lng="[50, 50]" draggable />
</LMap>
```

<!--@include: ../gen/components/LMarker.md-->

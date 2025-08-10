---
outline: deep
---

# LControlAttribution

> The attribution control allows you to display attribution data in a small text bos on a map.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LControlAttribution } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LControlAttribution position="topright" prefix="A custom prefix" />
</LMap>

```vue{8}
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LControlAttribution position="topright" prefix="A custom prefix" />
</LMap>
```

<!--@include: ../gen/components/LControlAttribution.md-->

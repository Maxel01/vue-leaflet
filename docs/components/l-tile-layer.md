---
outline: deep
---

# LTileLayer

> Load tiles from a map server and display them accordingly to map zoom, center and size.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />

<LTileLayer
url="https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"
attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
:min-zoom="5"
:max-zoom="12"
/>
</LMap>

```vue{2-8,10-16}
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <!-- Base Layer -->
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />

  <!-- Overlay Layer -->
  <LTileLayer
    url="https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"
    attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
    :min-zoom="5"
    :max-zoom="12"
  />
</LMap>
```

<!--@include: ../gen/components/LTileLayer.md-->

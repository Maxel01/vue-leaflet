---
outline: deep
---

# LMap

> Base component, contains and wraps all the other components.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from '../../src/lib.ts';
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

<!--@include: ../gen/components/LMap.md-->

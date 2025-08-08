---
outline: deep
---

# LWmsTileLayer

> Display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map.

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LWmsTileLayer } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LWmsTileLayer
    url="https://ows.mundialis.de/services/service?"
    attribution="Mundialis"
    layer-type="base"
    name="mundialis.de"
    :max-zoom="10"
    version="1.3.0"
    format="image/png"
    :transparent="true"
    :layers="'TOPO-WMS,OSM-Overlay-WMS'"
  />
</LMap>

```vue
<LMap style="height: 350px" :zoom="2" :center="[47.21322, -1.559482]">
  <LWmsTileLayer
    url="https://ows.mundialis.de/services/service?"
    attribution="Mundialis"
    layer-type="base"
    name="mundialis.de"
    :max-zoom="10"
    version="1.3.0"
    format="image/png"
    :transparent="true"
    :layers="'TOPO-WMS,OSM-Overlay-WMS'"
  />
</LMap>
```

<!--@include: ../gen/components/LWmsTileLayer.md-->

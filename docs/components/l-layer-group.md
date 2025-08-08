---
outline: deep
---

# LLayerGroup

> Use to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well.

::: warning
This still needs better documentation and examples.
:::

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LLayerGroup, LMarker } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LLayerGroup>
    <LMarker :lat-lng="[47.21322, -1.559482]" />
  </LLayerGroup>
</LMap>

```vue
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LLayerGroup>
    <LMarker :lat-lng="[47.21322, -1.559482]" />
  </LLayerGroup>
</LMap>
```

<!--@include: ../gen/components/LLayerGroup.md-->

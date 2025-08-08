---
outline: deep
---

# LFeatureGroup

> Extended [LLayerGroup](/components/l-layer-group.html) that makes it easier to do the same thing to all its member layers.

::: warning
This still needs better documentation and examples.
:::

## Demo

<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LFeatureGroup, LMarker } from '../../src/lib.ts';
</script>

<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LFeatureGroup>
    <LMarker :lat-lng="[47.21322, -1.559482]" />
  </LFeatureGroup>
</LMap>

```vue
<LMap style="height: 350px" :zoom="8" :center="[47.21322, -1.559482]">
  <LTileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
    layer-type="base"
    name="OpenStreetMap"
  />
  <LFeatureGroup>
    <LMarker :lat-lng="[47.21322, -1.559482]" />
  </LFeatureGroup>
</LMap>
```

<!--@include: ../gen/components/LFeatureGroup.md-->

---
outline: deep
---

# LCircleMarker

> A circle of a fixed size with radius specified in pixels.

## Demo

<script>
import "leaflet/dist/leaflet.css";
</script>

<div style="height:350px; width: 100%">
    <CircleMarkerDemo />
</div>

```html{7-11}
<LMap ref="map" v-model:zoom="zoom" :center="[41.89026, 12.49238]">
    <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
    />
    <LCircleMarker 
        :lat-lng="[41.89026, 12.49238]" 
        :radius="50" 
        color="red"
    />
</LMap>
```

<!--@include: ../gen/components/LCircleMarker.md-->

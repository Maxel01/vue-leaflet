<script lang="ts">
import { defineComponent } from 'vue'
import { LControl, LMap, LTileLayer } from '../../components'

export default defineComponent({
    components: { LControl, LTileLayer, LMap },
})
</script>

<template>
    <LMap ref="map" :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
        <LControl class="leaflet-control leaflet-demo-control" position="bottomleft"
            >Hello, Map!
        </LControl>
    </LMap>
</template>

<style>
.leaflet-demo-control {
    background: white;
    border: 1px solid steelblue;
    border-radius: 0.6em;
    padding: 1em;
    font-size: large;
    font-style: italic;
}
</style>

<script setup lang="ts">
import { LFeatureGroup, LMap, LMarker, LTileLayer } from '../../components'
</script>

<template>
    <LMap :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LFeatureGroup>
            <LMarker :lat-lng="[50, 50]" />
        </LFeatureGroup>
    </LMap>
</template>

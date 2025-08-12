<script setup lang="ts">
import { LCircle, LMap, LTileLayer } from '../../components'
</script>

<template>
    <LMap ref="map" :zoom="11" :center="[44.48865, 11.3317]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LCircle :lat-lng="[44.48865, 11.3317]" :radius="5000" color="green" />
    </LMap>
</template>

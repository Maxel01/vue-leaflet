<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { LHotline } from '@maxel01/vue-leaflet-plugins'
</script>

<template>
    <LMap :zoom="9" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LHotline
            :lat-lngs="[
                [47.334852, -1.509485, 1],
                [47.342596, -1.328731, 2],
                [47.241487, -1.190568, 3],
                [47.234787, -1.358337, 2]
            ]"
            :min="1" :max="3"
        />
    </LMap>
</template>

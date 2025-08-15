<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { ref } from 'vue'

const zoom = ref<number>(2)
</script>

<template>
    <LMap v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        />
    </LMap>
</template>

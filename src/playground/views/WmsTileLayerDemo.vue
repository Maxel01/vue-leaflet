<script setup lang="ts">
import { LMap, LWmsTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(2)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
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
</template>

<style></style>

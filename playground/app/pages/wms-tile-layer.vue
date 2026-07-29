<script setup lang="ts">
import { ref } from 'vue'
import { LControlLayers, LMap, LWmsTileLayer } from '@maxel01/vue-leaflet'

const wmsVisible = ref(true)
</script>

<template>
    <LMap :zoom="2" :center="[47.41322, -1.219482]">
        <LControlLayers />
        <LWmsTileLayer
            url="https://ows.mundialis.de/services/service?"
            attribution="Mundialis"
            layer-type="base"
            v-model:visible="wmsVisible"
            name="mundialis.de"
            :max-zoom="10"
            version="1.3.0"
            format="image/png"
            :transparent="true"
            :layers="'TOPO-WMS,OSM-Overlay-WMS'"
        />
    </LMap>
    <button type="button" @click="wmsVisible = !wmsVisible">
        Click for change visible for {{ wmsVisible ? 'Hide' : 'Show' }} WMS tile layer
    </button>
</template>

<script setup lang="ts">
import { LMap, LWmsTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(2)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <LWmsTileLayer
            url="https://maps.heigit.org/osm-wms/service"
            attribution="HeiGIT <a href='osm-wms.de'>OSM WMS</a>"
            layer-type="base"
            name="osm-wms.de"
            :max-zoom="10"
            version="1.3.0"
            format="image/png"
            :transparent="true"
            layers="osm_auto:all"
        />
    </LMap>
</template>

<style></style>

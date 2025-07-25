<script setup lang="ts">
import { LMap, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(2)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]" style="width: 100%">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>
    </LMap>
</template>

<style></style>

<script setup lang="ts">
import { LCircle, LMap, LTileLayer } from '../../components'
import { ref } from 'vue'

const zoom = ref<number>(11)
</script>

<template>
    <LMap ref="map" v-model:zoom="zoom" :center="[44.48865, 11.3317]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
        ></LTileLayer>

        <LCircle :lat-lng="[44.48865, 11.3317]" :radius="5000" color="green" />
    </LMap>
</template>

<style></style>

<script setup lang="ts">
import { LIcon, LMap, LMarker, LTileLayer } from '../../components'
import { computed, ref } from 'vue'
import type { PointExpression } from 'leaflet'

const zoom = ref<number>(8)
const iconWidth = ref<number>(21)
const iconHeight = ref<number>(42)

function changeIcon() {
    iconWidth.value += 1
    if (iconWidth.value > iconHeight.value) {
        iconWidth.value = Math.floor(iconHeight.value / 2)
    }
}

const iconUrl = computed(() => {
    return `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`
})
const iconSize = computed((): PointExpression => {
    return [iconWidth.value, iconHeight.value]
})
</script>

<template>
    <div style="width: 100%; height: 100%">
        <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            ></LTileLayer>

            <LMarker :lat-lng="[47.41322, -1.219482]">
                <LIcon :iconUrl="iconUrl" :iconSize="iconSize" />
            </LMarker>
            <LMarker :lat-lng="[47.41323, -1.219482]"></LMarker>

            <LMarker :lat-lng="[47.61322, -0.519482]">
                <LIcon :iconSize="[21, 21]">★</LIcon>
            </LMarker>
            <LMarker :lat-lng="[47.61322, -0.519482]"></LMarker>

            <LMarker :lat-lng="[47, -1]">
                <LIcon className="">Hello, Map!</LIcon>
            </LMarker>
            <LMarker :lat-lng="[47, -1]"></LMarker>
        </LMap>

        <button @click="changeIcon">New kitten icon</button>
    </div>
</template>

<style>
.leaflet-div-icon {
    background: steelblue;
    color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    font-weight: bold;
    font-size: large;
    text-align: center;
    line-height: 21px;
}
</style>

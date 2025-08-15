<script setup lang="ts">
import { LIcon, LMap, LMarker, LTileLayer } from '@maxel01/vue-leaflet'
import { computed, ref } from 'vue'
import type { PointExpression } from 'leaflet'

const iconWidth = ref<number>(21)
const iconHeight = ref<number>(42)

function changeIcon() {
    iconWidth.value += 1
    if (iconWidth.value > iconHeight.value) {
        iconWidth.value = Math.floor(iconHeight.value / 2)
    }
}

const iconUrl = computed(() => {
    return `https://placebear.com/${iconWidth.value}/${iconHeight.value}`
})
const iconSize = computed((): PointExpression => {
    return [iconWidth.value, iconHeight.value]
})
</script>

<template>
    <div style="width: 100%; height: 100%">
        <LMap :zoom="8" :center="[47.41322, -1.219482]">
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
            />

            <LMarker :lat-lng="[47.41322, -1.219482]">
                <LIcon :iconUrl="iconUrl" :iconSize="iconSize" />
            </LMarker>
            <LMarker :lat-lng="[47.41323, -1.219482]"/>

            <LMarker :lat-lng="[47.61322, -0.519482]">
                <LIcon :iconSize="[21, 21]">★</LIcon>
            </LMarker>
            <LMarker :lat-lng="[47.61322, -0.519482]"/>

            <LMarker :lat-lng="[47, -1]">
                <LIcon className="">Hello, Map!</LIcon>
            </LMarker>
            <LMarker :lat-lng="[47, -1]"/>
        </LMap>

        <button class="bearBtn" @click="changeIcon">New bear icon</button>
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

.bearBtn {
    border: 1px solid;
}
</style>

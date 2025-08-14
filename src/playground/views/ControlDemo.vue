<script setup>
import { LMap, LTileLayer, LControl } from '@/maxel01/vue-leaflet'

const clickHandler = () => {
    alert('and mischievous')
}
</script>

<template>
    <LMap :zoom="8" :center="[47.21322, -1.559482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LControl position="bottomleft">
            <button
                style="background: white; color: black; padding: 2px; border-radius: 5px;"
                @click="clickHandler"
            >I am a useless button!
            </button>
        </LControl>
    </LMap>
</template>

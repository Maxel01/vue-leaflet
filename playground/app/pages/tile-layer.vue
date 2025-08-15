<script setup lang="ts">
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
</script>

<template>
    <LMap :zoom="8" :center="[47.41322, -1.219482]">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
            :max-zoom="10"
        />
        <LTileLayer
            url="https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"
            layer-type="overlay"
            attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
            :min-zoom="5"
            :max-zoom="10"
        />
    </LMap>
</template>

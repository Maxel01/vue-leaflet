<script setup lang="ts">
import { h } from 'vue'
import { LGridLayer, LMap, LTileLayer } from '../../components'

const childRender = (props) => () => {
    return h(
        'div',
        { style: 'border: 1px solid grey; height: 100%;' },
        `x: ${props.coords.x} y: ${props.coords.y} z: ${props.coords.z}`
    )
}
</script>

<template>
    <LMap :zoom="2" :center="[47.41322, -1.219482]">
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LGridLayer :child-render="childRender" />
    </LMap>
</template>

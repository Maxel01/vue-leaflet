# Reactivity in vue-leaflet

vue-leaflet integrates Vue’s powerful reactive system to provide a seamless and efficient way to work with Leaflet maps and layers inside your Vue components. This guide explains how reactivity is implemented and how you can leverage it effectively.

## Core Concept

Leaflet itself is imperative: you create map objects, add layers, update properties via methods, and so forth. Vue, on the other hand, follows a reactive and declarative paradigm. vue-leaflet acts as a bridge that **maps reactive Vue props and state to Leaflet’s imperative API**.

When you update a prop on a vue-leaflet component, the corresponding Leaflet map or layer updates automatically and efficiently.

## How It Works

1. **Props Binding:**  
   vue-leaflet components accept props such as `center`, `zoom`, `layers`, or any Leaflet options (e.g., `color`, `radius` for markers). These props are reactive Vue refs or reactive data. \
   **However, not all props are reactive by default.** Some props are only used during component initialization and won’t trigger updates if changed afterward. For details on which props support reactivity and which don’t, please refer to the documentation for each component.

2. **Watching Props:**  
   Internally, vue-leaflet watches these props for changes. When a reactive prop changes, vue-leaflet calls the appropriate Leaflet API methods to update the map or layer.  
   For example, if you update the `center` prop, vue-leaflet calls Leaflet’s `map.panTo()` internally.

3. **Event Binding:**  
   vue-leaflet also exposes Leaflet events as Vue events. You can listen to map or layer events using Vue’s native event system, e.g., `@click="onClick"`.

4. **Cleanup:**  
   When components unmount, vue-leaflet ensures proper cleanup by removing layers or listeners from the map to avoid memory leaks.

## Example

```vue
<script setup>
import { ref } from 'vue'

const zoom = ref(13)
const center = ref([51.505, -0.09])
const markerPosition = ref([51.505, -0.09])
const radius = ref(20)
const color = ref('red')

// Updating reactive properties updates the Leaflet map and marker automatically
setTimeout(() => {
  center.value = [51.51, -0.1]
  radius.value = 30
  color.value = 'blue'
}, 3000)
</script>
<template>
  <LMap :zoom="zoom" :center="center" style="height: 400px; width: 100%">
    <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <LCircleMarker :lat-lng="markerPosition" :radius="radius" :color="color" />
  </LMap>
</template>
```
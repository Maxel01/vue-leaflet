---
outline: deep
---

# Usage

Nuxt Leaflet is a module that provides a set of components (from [Vue Leaflet](https://github.com/vue-leaflet/vue-leaflet)) to work with Leaflet in Nuxt 3.

Here is a basic example of how to use the `LMap` and `LTileLayer` components to display a map :

```vue{2,5,9-15}
<!--@include: ../../src/playground/views/DemoHome.vue -->
```

And here is how it should look :

<script setup>
import "leaflet/dist/leaflet.css";
</script>

<div class="demo">
    <DemoHome />
</div>
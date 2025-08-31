---
outline: deep
---

# 🧑‍💻 Usage

Vue Leaflet is a module that provides a set of components to work with Leaflet in Vue 3.

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
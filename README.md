# 🗺️ Vue-Leaflet v2 Wrapper

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href] \
[![Vue][vue-src]][vue-href]
[![Leaflet][leaflet-src]][leaflet-href]

A modern Vue 3 wrapper for Leaflet v2, based on [vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet). Built with the Composition API, fully SSR-compatible, and designed for future extensibility.

> ⚠️ This is a **Beta version** and may be unstable. Contributions, feedback, and bug reports are welcome via [issues](https://github.com/Maxel01/vue-leaflet/issues) or [discussions](https://github.com/Maxel01/vue-leaflet/discussions).

> ✅ Fully compatible with SSR (tested in Nuxt playground)

---

## 🚀 What's New

- ✅ Leaflet v2 support
- ✅ Refactored with Vue 3 Composition API
- ✅ SSR compatibility without `useGlobalLeaflet`
- ✅ >95% test coverage
- ✅ Improved documentation ([vue-leaflet-docs](https://maxel01.github.io/vue-leaflet/))
- ✅ Component playground for live demos
- ✅ Plugin support via [vue-leaflet-plugins](https://github.com/Maxel01/vue-leaflet-plugins)

---

## ✅ Available Components

☑️ LCircle              
☑️ LCircleMarker        
☑️ LControl             
☑️ LControlAttribution  
☑️ LControlLayers       
☑️ LControlScale        
☑️ LControlZoom         
☑️ LFeatureGroup        
☑️ LGeoJson             
☑️ LIcon                
☑️ LImageOverlay        
☑️ LMap                 
☑️ LMarker              
☑️ LPolygon             
☑️ LPolyline            
☑️ LPopup               
☑️ LRectangle           
☑️ LSVGOverlay          
☑️ LTileLayer           
☑️ LTooltip             
☑️ LVideoOverlay        
☑️ LWmsTileLayer

---

## 🔌 Plugin Support

Leaflet plugins compatible with version 2 can be seamlessly integrated using a dedicated wrapper: \
👉 [vue-leaflet-plugins](https://github.com/Maxel01/vue-leaflet-plugins)

Explore the documentation to see which plugins are already supported and learn how to build your own wrappers for additional functionality.

The first plugin has already been implemented. If you need support for a specific plugin, open an issue in the plugin repo and help shape the roadmap.

> ⚠️ **Important:** Leaflet v1 plugins are **not compatible** with Leaflet v2 and cannot be used directly. To use a plugin with v2, it must be ported and wrapped appropriately. \
> However, there is a possibility to use the [Leaflet-V1-polyfill](https://github.com/Falke-Design/Leaflet-V1-polyfill). Check out the [`vue-leaflet-plugins`](https://github.com/Maxel01/vue-leaflet-plugins) wrapper for more.

---

## 📦 Installation

```bash
pnpm add @maxel01/vue-leaflet leaflet@^2.0.0
# or
yarn add @maxel01/vue-leaflet leaflet@^2.0.0
# or
npm i @maxel01/vue-leaflet leaflet@^2.0.0
```

---

## 🧑‍💻 Usage

Check out the full documentation at [vue-leaflet-docs](https://maxel01.github.io/vue-leaflet/) or explore the [playground](https://github.com/Maxel01/vue-leaflet/tree/master/playground/app/pages).

Most props mirror the vanilla [Leaflet options](https://leafletjs.com/reference-2.0.0.html) for a familiar experience.

### ⚡ Quickstart

```vue
<script setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
import { ref } from 'vue'

const zoom = ref(2)
</script>

<template>
  <div style="height:600px; width:800px">
    <LMap v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
    </LMap>
  </div>
</template>
```

---

## 🧪 Interactive Playground

Unlock the full potential of **vue-leaflet** with interactive demo components built right into the [official documentation](https://maxel01.github.io/vue-leaflet/). The playground lets you explore real-world examples, experiment with features live, and see how everything fits together.

Want to test **Server-Side Rendering (SSR)**? Dive into the **Nuxt playground** for a hands-on SSR experience.

To run the **Nuxt Playground** locally:

```bash
git clone https://github.com/maxel01/vue-leaflet.git
cd vue-leaflet
pnpm install
pnpm dev
```
Visit: [http://127.0.0.1:3000](http://127.0.0.1:3000)

Or use the Vue-specific playground:

```bash
pnpm dev:vue
```

Visit: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

## 🛠 Contribution

This repo uses `pnpm` for building and development.

> 📘 [How to install PNPM](https://pnpm.io/installation)

See the [contribution guide](https://maxel01.github.io/vue-leaflet/getting-started/contribution.html) for more.

---

## 🙌 Credits

- [vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet)
- [nuxt-modules/leaflet](https://github.com/nuxt-modules/leaflet)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@maxel01/vue-leaflet/latest.svg?color=0F81C2
[npm-version-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet

[npm-downloads-src]: https://img.shields.io/npm/dm/@maxel01/vue-leaflet.svg
[npm-downloads-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet

[license-src]: https://img.shields.io/npm/l/@maxel01/vue-leaflet.svg
[license-href]: https://www.npmjs.com/package/@maxel01/vue-leaflet

[vue-src]: https://img.shields.io/npm/dependency-version/@maxel01/vue-leaflet/peer/vue?label=Vue&logo=vue.js&colorA=18181B
[vue-href]: https://vuejs.org

[leaflet-src]: https://img.shields.io/npm/dependency-version/@maxel01/vue-leaflet/peer/leaflet?label=Leaflet&logo=leaflet&colorA=18181B
[leaflet-href]: https://leafletjs.com/
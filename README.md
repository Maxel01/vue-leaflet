# vue-leaflet

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href] \
[![Vue][vue-src]][vue-href]
[![Leaflet][leaflet-src]][leaflet-href]

Vue-leaflet wrapper supporting leaflet v2 (based on [vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet)).

This is an Alpha version! And may yet be unstable! If you want to help, please reach out in an [issue](https://github.com/Maxel01/vue-leaflet/issues) or join the [discussions](https://github.com/Maxel01/vue-leaflet/discussions).

> This wrapper is fully compatible with SSR.

> [!NOTE]
> All SSR tests were performed in Nuxt using the playground.

### What's new?

- uses leaflet v2-alpha
- rewrite with composition api
- SSR compatible without useGlobalLeaflet

### What's planned?
#### Leaflet plugins
This leaflet wrapper can't be used to add leaflet plugins as most of the plugins do not support v2 yet. This wrapper drops the L object support without a legacy version. Use the previous wrapper instead.

I am therefore planning on porting the leaflet plugins to v2 and create a leaflet-plugins-wrapper. So create an issue if a plugin is not yet supported.

#### Docs
Nuxt-leaflet already provides good documentation for the leaflet-wrapper. However, these docs have been customized and added to this repo: [vue-leaflet-docs](https://maxel01.github.io/vue-leaflet/). \
The docs also contains the playground demo components.

#### Tests
The previous leaflet-wrapper did not really have tests. These will be added soon to provide a stable and reliable wrapper.

#### What else?
Let me now what you need!

## What works?
- ✅ Fully working
- ☑️ Works in playground
- 🔧 Support planned
- ❌ Not implemented

☑️ LCircle \
☑️ LCircleMarker \
☑️ LControl\
☑️ LControlAttribution\
☑️ LControlLayers\
☑️ LControlScale\
☑️ LControlZoom\
☑️ LFeatureGroup\
☑️ LGeoJson\
☑️ LIcon\
☑️ LImageOverlay\
☑️ LMap\
☑️ LMarker\
☑️ LPolygon\
☑️ LPolyline\
☑️ LPopup\
☑️ LRectangle\
☑️ LSVGOverlay\
☑️ LTileLayer\
☑️ LTooltip\
☑️ LVideoOverlay\
☑️ LWmsTileLayer

## Installation

```bash
pnpm add @maxel01/vue-leaflet leaflet@2.0.0-alpha
```

```bash
yarn add @maxel01/vue-leaflet leaflet@2.0.0-alpha
```

```bash
npm i @maxel01/vue-leaflet leaflet@2.0.0-alpha
```

## Usage

The documentation is ready, please check the
[vue-leaflet docs](https://maxel01.github.io/vue-leaflet/) for examples and the usage with Vue 3 or check the [playground](https://github.com/Maxel01/vue-leaflet/tree/master/playground/app/pages).
Most component props mimic the vanilla [Leaflet options](https://leafletjs.com/reference-2.0.0.html) as closely as
possible.

### Quickstart

```vue
<script setup>
  import 'leaflet/dist/leaflet.css'
  import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
  import ref from "vue"

  const zoom = ref<number>(2)
</script>

<template>
  <div style="height:600px; width:800px">
    <LMap ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></LTileLayer>
    </LMap>
  </div>
</template>

<style></style>
```

### Component playground

To see the [component playground](https://github.com/Maxel01/vue-leaflet/tree/master/playground/app/pages) in action,
clone this repo and run the local dev server, then visit http://127.0.0.1:5173,
```bash
git clone https://github.com/maxel01/vue-leaflet.git
cd vue-leaflet
pnpm install
pnpm run dev
```

### Server-side rendering (SSR)

Leaflet v2 now supports ES modules and can be imported directly. So far there were no issues with SSR.

```vue
<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson } from "@maxel01/vue-leaflet";
import CircleMarker from "leaflet"

const geojson = { 
  type: "FeatureCollection",
  features: [
    // ...
  ],
}
const geojsonOptions = {
  pointToLayer: (feature, latLng) => new CircleMarker(latLng, { radius: 8 }),
  // ...
}
</script>

<template>
  <div style="height:600px; width:800px">
    <p>vue-leaflet SSR Demo</p>
    <LMap :zoom="2" :center="[47.41322, -1.219482]">
      <LGeoJson :geojson="geojson" :options="geojsonOptions" />
    </LMap>
  </div>
</template>
```

## For Maintainers

This repo uses pnpm for building the package.

Add the pnpm-lock.json to the commit only if necessary.

> [!NOTE]
> ([How do I install PNPM?](https://pnpm.io/installation))

## Credits

[vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet)

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
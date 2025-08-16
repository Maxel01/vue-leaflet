<script setup lang="ts">
</script>

<template>
  <div class="main-wrapper">
    <div class="menu">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/grid-layer">GridLayer</NuxtLink>
      <NuxtLink to="/tile-layer">TileLayer</NuxtLink>
      <NuxtLink to="/wms-tile-layer">WmsTileLayer</NuxtLink>
      <NuxtLink to="/image-overlay">ImageOverlay</NuxtLink>
      <NuxtLink to="/svg-overlay">SVGOverlay</NuxtLink>
      <NuxtLink to="/video-overlay">VideoOverlay</NuxtLink>
      <NuxtLink to="/feature-group">Feature Group</NuxtLink>
      <NuxtLink to="/circle">Circle</NuxtLink>
      <NuxtLink to="/circle-marker">CircleMarker</NuxtLink>
      <NuxtLink to="/control">Control</NuxtLink>
      <NuxtLink to="/control-attribution">Attribution</NuxtLink>
      <NuxtLink to="/control-custom-message">Custom Message</NuxtLink>
      <NuxtLink to="/control-layers">Layers</NuxtLink>
      <NuxtLink to="/control-scale">Scale</NuxtLink>
      <NuxtLink to="/control-zoom">Zoom</NuxtLink>
      <NuxtLink to="/geo-json">GeoJSON</NuxtLink>
      <NuxtLink to="/icon">Icon</NuxtLink>
      <NuxtLink to="/marker">Marker</NuxtLink>
      <NuxtLink to="/polygon">Polygon</NuxtLink>
      <NuxtLink to="/polyline">Polyline</NuxtLink>
      <NuxtLink to="/popup">Popup</NuxtLink>
      <NuxtLink to="/rectangle">Rectangle</NuxtLink>
      <NuxtLink to="/tooltip">Tooltip</NuxtLink>
    </div>
    <div class="map-wrapper">
      <NuxtPage/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  display: flex;
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu a {
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
}

.menu .router-link-exact-active {
  background-color: lightgray;
}

.map-wrapper {
  height: 75vh;
  width: 100%;
}
</style>

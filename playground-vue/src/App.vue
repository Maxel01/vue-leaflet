<script setup lang="ts">
</script>

<template>
    <div class="main-wrapper">
        <div class="menu">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/grid-layer">GridLayer</RouterLink>
            <RouterLink to="/tile-layer">TileLayer</RouterLink>
            <RouterLink to="/wms-tile-layer">WmsTileLayer</RouterLink>
            <RouterLink to="/image-overlay">ImageOverlay</RouterLink>
            <RouterLink to="/svg-overlay">SVGOverlay</RouterLink>
            <RouterLink to="/video-overlay">VideoOverlay</RouterLink>
            <RouterLink to="/feature-group">Feature Group</RouterLink>
            <RouterLink to="/circle">Circle</RouterLink>
            <RouterLink to="/circle-marker">CircleMarker</RouterLink>
            <RouterLink to="/control">Control</RouterLink>
            <RouterLink to="/control-attribution">Attribution</RouterLink>
            <RouterLink to="/control-custom-message">Custom Message</RouterLink>
            <RouterLink to="/control-layers">Layers</RouterLink>
            <RouterLink to="/control-scale">Scale</RouterLink>
            <RouterLink to="/control-zoom">Zoom</RouterLink>
            <RouterLink to="/geo-json">GeoJSON</RouterLink>
            <RouterLink to="/icon">Icon</RouterLink>
            <RouterLink to="/marker">Marker</RouterLink>
            <RouterLink to="/polygon">Polygon</RouterLink>
            <RouterLink to="/polyline">Polyline</RouterLink>
            <RouterLink to="/popup">Popup</RouterLink>
            <RouterLink to="/rectangle">Rectangle</RouterLink>
            <RouterLink to="/tooltip">Tooltip</RouterLink>
        </div>
        <div class="map-wrapper">
            <RouterView />
        </div>
    </div>
</template>

<style>
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

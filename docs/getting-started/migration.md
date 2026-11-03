# Migration Guide

## Upgrading Leaflet to v2

Leaflet released a new [major version](https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html) in alpha state. With the modernization comes a bunch of changes. If you use leaflet directly in your code make sure to follow the [leaflet migration guide](https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html#migration).

## Upgrading the vue-leaflet wrapper

### Major Changes

- core: remove `WINDOW_OR_GLOBAL` from `utils`
- core: remove `useGlobalLeaflet`
  - is not necessary with leaflet v2 and ESM support
- core: remove type `Data` from `utils`
- core: `crs` value in `LMap` now needs to be a value of `CRS` class
- interactiveLayer: rename `bubblingMouseEvents` to `bubblingPointerEvents`, see [Leaflet v2](https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html#layers)
  - also applies to ``Path``, ``Polyline``, ``Polygon``, ``CircleMarker``, ``Circle`` 
- deprecate unreachable code (see [#56](https://github.com/Maxel01/vue-leaflet/pull/56))
- utils: deprecate `resetWebpackIcon` (Leaflet 2 default icons are inline SVGs and PNG assets are no longer used)
- config: remove experimental flag `useResetWebpackIcon`
- icon: remove invalid DOM event listeners from `LIcon` (Leaflet `Icon` and `DivIcon` instances do not implement `EventTarget`; events should be bound on `LMarker` or directly on elements inside the `LIcon` template slot)
- types: remove `IMapBlueprint`
- types: Leaflet 2 now provides native TypeScript types (`@types/leaflet` should be removed); several component prop and method types have been updated to match Leaflet 2 typings

### New Components

Two new components have been added:
- `LSVGOverlay`
- `LVideoOverlay`

### Plugin support

Check out [vue-leaflet-plugins](https://github.com/Maxel01/vue-leaflet-plugins) for the new plugin support.
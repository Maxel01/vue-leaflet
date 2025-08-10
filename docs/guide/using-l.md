# Accessing the L global variable

In Leaflet v2, the global `L` variable is no longer exposed by default. Although it is still possible to import `L` directly from the legacy Leaflet package, this approach is not used in the `vue-leaflet` wrapper. As a result, the global `L` variable is not available within this library.

Many existing Leaflet plugins still depend on the global `L`, but over time these plugins will need to be rewritten to support modern, import-based usage.

There are plans to create a dedicated package to provide support for Leaflet plugins in Vue, including their migration to Leaflet v2.
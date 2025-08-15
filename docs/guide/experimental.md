# Experimental Features

Our library provides a set of **experimental flags** to enable or disable certain features that are still under development. These flags are **optional** and grouped under the `experimental` namespace in the configuration.

## Default Configuration

```ts
import { vueLeafletConfig } from '@maxel01/vue-leaflet'

console.log(vueLeafletConfig.experimental)
// {
//   useResetWebpackIcon: true,
//   skipUndefinedProps: false
// }
```

| Flag                | Description                                                                                                                                                                                                                                                                                  |
| ------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| useResetWebpackIcon | Automatically resets Webpack icons (used for Leaflet's default markers). This was required in Leaflet v1, but it may no longer be necessary in v2. **If you use it, please create an issue or discussion to report whether it still works**.                                                 |
| skipUndefinedProps  | The `propsBinder` utility binds every reactive property to a watcher (see [reactivity in vue-leaflet](./reactivity-leaflet)). When enabled, any props that are `undefined` will be skipped and will no longer be reactive. This reduces the number of watchers and **improves performance**. |

## Overriding Flags

You can override the default values by calling `setLeafletConfig`:

```ts
import { setVueLeafletConfig, vueLeafletConfig } from '@maxel01/vue-leaflet'

setVueLeafletConfig({
  experimental: {
    skipUndefinedProps: false
  }
})

console.log(vueLeafletConfig.experimental.skipUndefinedProps) // false
```

This allows you to safely enable or disable experimental behaviors **without affecting top-level configuration options**.

## Example Usage

```ts
import { setVueLeafletConfig } from '@maxel01/vue-leaflet'

// Enable one experimental feature
setVueLeafletConfig({
  experimental: {
    useResetWebpackIcon: false
  }
})

// Override both experimental flags at once
setVueLeafletConfig({
  experimental: {
    useResetWebpackIcon: false,
    skipUndefinedProps: false
  }
})
```

## Notes

* These flags are **experimental**: their behavior may change in future versions.
* Top-level configuration options remain separate and are **not affected** by experimental flags.

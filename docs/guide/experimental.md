---
outline: [2,3]
title: Experimental Features
---

# 🧪 Experimental Features

This library provides a set of **[experimental flags](#🚩-experimental-flags)** to enable or disable certain features that are still under development. These flags are **optional** and grouped under the `experimental` namespace in the configuration.

## ⚙️ Default Configuration

```ts
import { vueLeafletConfig } from '@maxel01/vue-leaflet'

console.log(vueLeafletConfig.experimental)
// {
//   skipUndefinedProps: false
// }
```

## 🛠️ Overriding Flags

You can override the default values by calling `setVueLeafletConfig`:

```ts
import { setVueLeafletConfig, vueLeafletConfig } from '@maxel01/vue-leaflet'

setVueLeafletConfig({
  experimental: {
    skipUndefinedProps: true
  }
})

console.log(vueLeafletConfig.experimental.skipUndefinedProps) // true
```

This allows you to safely enable or disable experimental behaviors **without affecting top-level configuration options**.

## 🧾 Example Usage

```ts
import { setVueLeafletConfig } from '@maxel01/vue-leaflet'

// Enable an experimental feature
setVueLeafletConfig({
  experimental: {
    skipUndefinedProps: true
  }
})
```

## 📝 Notes

* These flags are **experimental**: their behavior may change in future versions.
* Top-level configuration options remain separate and are **not affected** by experimental flags.

## 🚩 Experimental Flags
### ⚡ skipUndefinedProps
The `propsBinder` utility binds every reactive property to a watcher (see [reactivity in vue-leaflet](./reactivity-leaflet)). When enabled, any props that are `undefined` will be skipped and will no longer be reactive. This reduces the number of watchers and **improves performance**.

#### Example
The `DemoHome` component **has 14 watchers by default**:
```vue
<!--@include: ../../playground/app/pages/index.vue -->
```
Enabling this feature reduces the number of watchers to **6**.

When using multiple components, the effect is even more significant: `TooltipDemo` uses **22 components**, which normally leads to **176 watchers**, but only **37** when this flag is enabled.

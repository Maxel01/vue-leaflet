# Testing with vue-leaflet

When unit testing Vue components that use `vue-leaflet` in headless browser environments like **JSDOM** (used by Vitest or Jest), Leaflet requires several browser APIs that JSDOM does not provide out of the box:

- `ResizeObserver`
- `window.matchMedia`
- Non-zero dimensions for DOM elements (`clientWidth` / `clientHeight`)

Without these mocks, Leaflet will throw errors during test execution (such as `ReferenceError: ResizeObserver is not defined`).

## Setup Test Environment

`vue-leaflet` provides a testing helper via the `@maxel01/vue-leaflet/tests` subpath that sets up these required mocks.

### In your Vitest or Jest setup file

You can call `setupVueLeafletTest()` in your global test setup file (e.g. `tests/setup.ts` in Vitest or `setupFilesAfterEnv` in Jest):

```ts
import { setupVueLeafletTest } from '@maxel01/vue-leaflet/tests'

// Sets up ResizeObserver, window.matchMedia, and default element dimensions
setupVueLeafletTest()
```

### Options

`setupVueLeafletTest` accepts an optional options object to configure the mock element dimensions:

```ts
setupVueLeafletTest({
    width: 600,  // Default clientWidth (default: 300)
    height: 400  // Default clientHeight (default: 300)
})
```

## Example Component Test

Here is an example of testing a component that mounts a map:

```vue
<!-- MapComponent.vue -->
<script setup>
import { LMap, LTileLayer } from '@maxel01/vue-leaflet'
</script>

<template>
  <div style="height: 400px; width: 600px">
    <LMap :zoom="2" :center="[47.41, -1.22]">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </LMap>
  </div>
</template>
```

```ts
// MapComponent.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { setupVueLeafletTest } from '@maxel01/vue-leaflet/tests'
import MapComponent from './MapComponent.vue'

// If not called in a global setup file, call it at the top of your test file:
setupVueLeafletTest()

describe('MapComponent', () => {
    it('renders and mounts properly', () => {
        const wrapper = mount(MapComponent)
        expect(wrapper.exists()).toBe(true)
    })
})
```

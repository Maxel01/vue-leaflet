# Testing with vue-leaflet

When testing components built with `vue-leaflet`, you typically encounter two scenarios:
1. **Component Testing in an Application:** Testing your own Vue components that render maps and layers.
2. **Plugin & Custom Layer Authoring:** Testing custom Leaflet wrappers, plugins, or extensions that interact with `vue-leaflet`'s internal injection hierarchy.

`vue-leaflet` provides testing helpers and utilities for both via the `@maxel01/vue-leaflet/tests` subpath.

---

## 1. Unit Testing in Applications

When unit testing Vue components that use `vue-leaflet` in headless browser environments like **JSDOM** (used by Vitest or Jest), Leaflet requires several browser APIs that JSDOM does not provide out of the box:

- `ResizeObserver`
- `window.matchMedia`
- Non-zero dimensions for DOM elements (`clientWidth` / `clientHeight`)

Without these mocks, Leaflet will throw errors during test execution (such as `ReferenceError: ResizeObserver is not defined`).

### Setup Test Environment (`setupVueLeafletTest`)

Call `setupVueLeafletTest()` in your global test setup file (e.g. `tests/setup.ts` in Vitest or `setupFilesAfterEnv` in Jest):

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

### Example Component Test

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

---

## 2. Testing Utilities for Plugin Authors

`@maxel01/vue-leaflet/tests` exports pre-configured component wrappers, lifecycle assertions, and mock injection functions for testing custom components, extensions, or plugins in isolation.

### Component Wrappers

Leaflet components require parent injection keys (e.g. `addLayer`, `removeLayer`). Wrapper factories mount components with these injections pre-configured:

```ts
import { createMarkerWrapper } from '@maxel01/vue-leaflet/tests'

const wrapper = await createMarkerWrapper({
    latLng: [44.5, 11.5]
})

const marker = wrapper.vm.leafletObject
```

### Lifecycle Assertions

Standardized test suites allow testing common Leaflet component lifecycle patterns:

```ts
import { describe } from 'vitest'
import {
    createMarkerWrapper,
    testEmitsReady,
    testRemoveOnUnmount
} from '@maxel01/vue-leaflet/tests'

describe('CustomMarker', () => {
    const getWrapper = () => createMarkerWrapper({ latLng: [45, 10] })

    // Asserts that the component emits 'ready' with its leafletObject on mount:
    testEmitsReady(getWrapper)

    // Asserts that leafletObject.remove() is called when the component is unmounted:
    testRemoveOnUnmount(getWrapper)
})
```

### Prop Binding Tests

You can test that updating Vue props propagates to Leaflet setters using `testPropsBindingToLeaflet`:

```ts
import { describe } from 'vitest'
import {
    createMarkerWrapper,
    testPropsBindingToLeaflet
} from '@maxel01/vue-leaflet/tests'
import { LatLng } from 'leaflet'

describe('LMarker prop bindings', () => {
    testPropsBindingToLeaflet(createMarkerWrapper, {
        zIndexOffset: 10,
        latLng: new LatLng(45.0, 10.0)
    })
})
```

---

<!--@include: ./generated-test-helpers.md-->

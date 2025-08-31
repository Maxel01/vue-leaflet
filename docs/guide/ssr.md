---
title: Server-Side Rendering (SSR)
---

# 🌐 Server-Side Rendering with vue-leaflet
:::info
This guide applies **only to Leaflet v2** and the official `vue-leaflet` wrapper. Leaflet v1 plugins and components are not supported.
:::

Vue-Leaflet v2 is designed to work seamlessly in SSR environments like **Nuxt 4** and **Vite**, enabling fast, SEO-friendly map applications without sacrificing interactivity.

SSR renders your app’s HTML on the server before sending it to the browser, improving performance and crawlability — especially important for public-facing map apps, dashboards, or location-based services.

## 🧪 Nuxt Playground

To help you get started, we've built a dedicated **Nuxt playground** that demonstrates SSR integration with vue-leaflet.

### 🔧 Local Setup

```bash
git clone https://github.com/Maxel01/vue-leaflet.git
cd vue-leaflet/playgrounds/nuxt-playground
pnpm install
pnpm dev
```

Visit `http://localhost:3000` to explore SSR-powered map components in action.

## 🛠️ SSR Integration Tips

Here are some best practices to ensure smooth SSR integration:

- ✅ **Use `client-only` rendering** for components that rely on browser-specific APIs (`window`, `document`, etc.)
- ✅ **Defer map rendering** using lifecycle hooks like `onMounted` or Nuxt’s `<ClientOnly>` wrapper
- ✅ **Avoid direct DOM manipulation** inside `setup()` or `onServerPrefetch()`
- ✅ **Lazy-load heavy components** to reduce initial server payload
- ✅ **Use dynamic imports** for plugins or features that are not SSR-safe

## 📦 Plugin Support

Only Leaflet plugins that have been ported to v2 and wrapped using [`vue-leaflet-plugins`](https://github.com/Maxel01/vue-leaflet-plugins) are compatible with SSR.  
If you need support for a specific plugin, feel free to [open an issue](https://github.com/Maxel01/vue-leaflet-plugins/issues) and help shape the roadmap.

## 📚 Additional Resources

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Leaflet v2 Overview](https://leafletjs.com)
- [vue-leaflet GitHub](https://github.com/Maxel01/vue-leaflet)
- [vue-leaflet-plugins](https://github.com/Maxel01/vue-leaflet-plugins)

---

Need help debugging SSR issues or want to contribute improvements? Join the discussion on GitHub and help grow the vue-leaflet ecosystem!
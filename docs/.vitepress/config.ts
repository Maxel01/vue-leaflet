import { defineConfig } from 'vitepress'
import { alias } from '../../alias.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Vue Leaflet',
    description: 'Documentation for the Vue Leaflet module',
    head: [
        ['link', { rel: 'icon', href: '/vue-leaflet/favicon.ico' }],
        [
            'script',
            {
                src: 'https://scripts.simpleanalyticscdn.com/latest.js',
                async: 'true',
                'data-collect-dnt': 'true'
            }
        ]
    ],
    base: '/vue-leaflet/',
    vite: {
        resolve: {
            alias
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Quick Start', link: '/getting-started/installation' },
            { text: 'Guide', link: '/guide/using-l' },
            { text: 'Components', link: '/components/introduction' },
            { text: 'Plugins', link: 'https://maxel01.github.io/vue-leaflet-plugins/' },
            { text: 'Contribution', link: '/getting-started/contribution' }
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Installation', link: '/getting-started/installation' },
                    { text: 'Usage', link: '/getting-started/usage' },
                    { text: 'Contribution', link: '/getting-started/contribution' },
                    { text: 'Migration', link: '/getting-started/migration' }
                ]
            },
            {
                text: 'Guide',
                items: [
                    { text: 'Using L', link: '/guide/using-l' },
                    { text: 'Accessing a map instance', link: '/guide/accessing-map-instance' },
                    { text: 'Reactivity in vue-leaflet', link: '/guide/reactivity-leaflet' },
                    { text: 'Server-Side Rendering with vue-leaflet', link: '/guide/ssr' },
                    { text: 'Experimental Features', link: '/guide/experimental' }
                ]
            },
            {
                text: 'Components',
                collapsed: true,
                items: [
                    { text: 'Introduction', link: '/components/introduction' },
                    { text: 'LCircle', link: '/components/l-circle' },
                    { text: 'LCircleMarker', link: '/components/l-circle-marker' },
                    { text: 'LControlAttribution', link: '/components/l-control-attribution' },
                    { text: 'LControlLayers', link: '/components/l-control-layers' },
                    { text: 'LControlScale', link: '/components/l-control-scale' },
                    { text: 'LControlZoom', link: '/components/l-control-zoom' },
                    { text: 'LControl', link: '/components/l-control' },
                    { text: 'LFeatureGroup', link: '/components/l-feature-group' },
                    { text: 'LGeoJson', link: '/components/l-geo-json' },
                    { text: 'LGridLayer', link: '/components/l-grid-layer' },
                    { text: 'LIcon', link: '/components/l-icon' },
                    { text: 'LImageOverlay', link: '/components/l-image-overlay' },
                    { text: 'LLayerGroup', link: '/components/l-layer-group' },
                    { text: 'LMap', link: '/components/l-map' },
                    { text: 'LMarker', link: '/components/l-marker' },
                    { text: 'LPolygon', link: '/components/l-polygon' },
                    { text: 'LPolyline', link: '/components/l-polyline' },
                    { text: 'LPopup', link: '/components/l-popup' },
                    { text: 'LRectangle', link: '/components/l-rectangle' },
                    { text: 'LSVGOverlay', link: '/components/l-svg-overlay' },
                    { text: 'LTileLayer', link: '/components/l-tile-layer' },
                    { text: 'LTooltip', link: '/components/l-tooltip' },
                    { text: 'LVideoOverlay', link: '/components/l-video-overlay' },
                    { text: 'LWmsTileLayer', link: '/components/l-wms-tile-layer' }
                ]
            },
            {
                text: 'About',
                items: [{ text: 'Q&A', link: '/about/q&a' }]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/maxel01/vue-leaflet' },
            { icon: 'npm', link: 'https://www.npmjs.com/package/@maxel01/vue-leaflet' }
        ],

        search: {
            provider: 'local'
        }
    },
    ignoreDeadLinks: true
})

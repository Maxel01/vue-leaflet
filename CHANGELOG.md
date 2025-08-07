# Changelog

## [1.0.0-alpha.1](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2025-08-07)


### ✨ Features

* **core:** add LSVGOverlay component ([#31](https://github.com/maxel01/vue-leaflet/issues/31)) ([2ac948f](https://github.com/maxel01/vue-leaflet/commit/2ac948f46afb25a5f3375eb0630be3b6b7b21e6a))
* **core:** add LVideoOverlay component ([#33](https://github.com/maxel01/vue-leaflet/issues/33)) ([f3c76db](https://github.com/maxel01/vue-leaflet/commit/f3c76dba8d680f3a308e4335a4c8d9caf7569443))


### 🐛 Bug Fixes

* **build:** add version to installation details, and fixes [#24](https://github.com/maxel01/vue-leaflet/issues/24): the build script is now independent of the package manager ([#27](https://github.com/maxel01/vue-leaflet/issues/27)) ([5929d7d](https://github.com/maxel01/vue-leaflet/commit/5929d7daea503361c8eea38b262724574f68cb69))


### 🚧 Chores

* add badges to `README.md` ([#35](https://github.com/maxel01/vue-leaflet/issues/35)) ([c897dcc](https://github.com/maxel01/vue-leaflet/commit/c897dcc71cc0479ff4ad81efe1af6f2dd29cff08))
* add information for maintainers. ([#28](https://github.com/maxel01/vue-leaflet/issues/28)) ([ecc75f5](https://github.com/maxel01/vue-leaflet/commit/ecc75f52b308560d580975036c0cce3b0de4d2fb))
* change leaflet version to the correct one ([7a49142](https://github.com/maxel01/vue-leaflet/commit/7a491420ad9d006cb1d5d396d36d1b951b551be1))


### ✅ Tests

* add tests for `utils.ts` and basic tests for `LControlAttribution` ([#34](https://github.com/maxel01/vue-leaflet/issues/34)) ([6afa136](https://github.com/maxel01/vue-leaflet/commit/6afa13607e5326738b2081d7f4a69471eb28f1d5))

## 1.0.0-alpha.0 (2025-07-28)


### ⚠ BREAKING CHANGES

* **core:** REVERTED: pass iconOptions as Object instead of props (LIcon)
* **core:** REVERTED: pass layerOptions as Object instead of props (LMarker)
* **core:** REVERTED: setupMarkerLayer does not return options anymore
* **core:** REVERTED: pass layerOptions as Object instead of props (LTileLayer, LGridLayer)
* **core:** REVERTED: setupLayer / setupComponent do not return options anymore
* **core:** remove WINDOW_OR_GLOBAL from utils
* **core:** remove type Data from utils
* **core:** remove useGlobalLeaflet
* **core:** crs value now needs to be a value of CRS class
* **core:** REVERTED: use prop mapOptions for leaflet instead of passing options directly to the component.

### ✨ Features

* **core:** add LCircle and LCircleMarker components ([#18](https://github.com/maxel01/vue-leaflet/issues/18)) ([2c4fcf5](https://github.com/maxel01/vue-leaflet/commit/2c4fcf5329b5b1d88076dc2343fe1e817fd4f042))
* **core:** add LControl (-Attribution, -Layers, -Scale, -Zoom) components ([#16](https://github.com/maxel01/vue-leaflet/issues/16)) ([0992444](https://github.com/maxel01/vue-leaflet/commit/0992444add59b6ab9feab26979e7cb8348268855))
* **core:** add LFeatureGroup and LLayerGroup components ([#19](https://github.com/maxel01/vue-leaflet/issues/19)) ([1ab7440](https://github.com/maxel01/vue-leaflet/commit/1ab74400b97f3f24a465fc90e506b9012ae69a4b))
* **core:** add LGeoJson component ([#21](https://github.com/maxel01/vue-leaflet/issues/21)) ([24f21f0](https://github.com/maxel01/vue-leaflet/commit/24f21f0a4a5ff52b91d070649078dfbc9dacf9a2))
* **core:** add LGridLayer and LTileLayer component ([#5](https://github.com/maxel01/vue-leaflet/issues/5)) ([ab536d1](https://github.com/maxel01/vue-leaflet/commit/ab536d1e87d57e4329edbd62777b1303bdbe0144))
* **core:** add LIcon component ([#9](https://github.com/maxel01/vue-leaflet/issues/9)) ([d127f0b](https://github.com/maxel01/vue-leaflet/commit/d127f0bdd22c6cc3f8d41f9e8c8dd80981cbc6b0))
* **core:** add LMap component ([#2](https://github.com/maxel01/vue-leaflet/issues/2)) ([dc0c4a4](https://github.com/maxel01/vue-leaflet/commit/dc0c4a45bca28429432570d587497e1c6ce6aae3))
* **core:** add LMarker component ([#8](https://github.com/maxel01/vue-leaflet/issues/8)) ([6a1550f](https://github.com/maxel01/vue-leaflet/commit/6a1550f1f561a06eb51963271b4322fbf1091b2c))
* **core:** add LPolyline and LPolygon component ([#14](https://github.com/maxel01/vue-leaflet/issues/14)) ([742ce3b](https://github.com/maxel01/vue-leaflet/commit/742ce3b8c35febebfc7b26ffdd2d049dba97fdc7))
* **core:** add LPopup and LImageOverlay components ([#20](https://github.com/maxel01/vue-leaflet/issues/20)) ([6ed3f9d](https://github.com/maxel01/vue-leaflet/commit/6ed3f9db519634a6df9548ea5d09b41c17390f16))
* **core:** add LRectangle component ([#15](https://github.com/maxel01/vue-leaflet/issues/15)) ([cd638b5](https://github.com/maxel01/vue-leaflet/commit/cd638b5835fe21676d8e7004c3a6b3af6f15ac02))
* **core:** add LTooltip component ([#12](https://github.com/maxel01/vue-leaflet/issues/12)) ([3cf1c28](https://github.com/maxel01/vue-leaflet/commit/3cf1c28256f6aa93f80f91661368be6c184c5d33))
* **core:** add LWmsTileLayer component ([#13](https://github.com/maxel01/vue-leaflet/issues/13)) ([af7858b](https://github.com/maxel01/vue-leaflet/commit/af7858b020cf4b36cabf5b14b395e6e8df5d9cee))
* **core:** add release-it to generate the changelog and publish the release ([#4](https://github.com/maxel01/vue-leaflet/issues/4)) ([2cf7a4a](https://github.com/maxel01/vue-leaflet/commit/2cf7a4a3b0f9cf0160bd5a73c502151de3a4081b))
* **core:** Revert some of the breaking changes (LMap [#2](https://github.com/maxel01/vue-leaflet/issues/2), LGridLayer [#5](https://github.com/maxel01/vue-leaflet/issues/5), LTileLayer [#5](https://github.com/maxel01/vue-leaflet/issues/5), LMarker [#8](https://github.com/maxel01/vue-leaflet/issues/8), LIcon [#9](https://github.com/maxel01/vue-leaflet/issues/9)) ([#11](https://github.com/maxel01/vue-leaflet/issues/11)) ([e8164d5](https://github.com/maxel01/vue-leaflet/commit/e8164d578f7ee7cc7de6ac8aeb365e9ee77733da))
* **playground:** Update playground to use LMap component ([#3](https://github.com/maxel01/vue-leaflet/issues/3)) ([6c1afc4](https://github.com/maxel01/vue-leaflet/commit/6c1afc405e38082277b5d6109f430a9fb322b90c))


### 🐛 Bug Fixes

* **core:** emit is now available on setup in LGridLayer and LTileLayer ([#7](https://github.com/maxel01/vue-leaflet/issues/7)) ([98a8980](https://github.com/maxel01/vue-leaflet/commit/98a89806b7edec584933621307f91bdd6eee2031))
* **core:** remove invalid L. names ([4083e45](https://github.com/maxel01/vue-leaflet/commit/4083e45ae2bb8409f95a3aa52310111ec2442ee9))
* **LMap:** fix warning when passing CRS value ([#20](https://github.com/maxel01/vue-leaflet/issues/20)) ([6a3dd91](https://github.com/maxel01/vue-leaflet/commit/6a3dd91487dd32ceabf314616af30d582bebc7f1))
* **LMarker:** use el.type.__name instead of el.type.name to detect rendered slot content ([#10](https://github.com/maxel01/vue-leaflet/issues/10)) ([69bdec4](https://github.com/maxel01/vue-leaflet/commit/69bdec4b0f77dd9ac04002e877888c3ab55bb13e))


### ♻️ Refactoring

* **LMap:** format file to match the common pattern. Replace if checks with ? to check for undefined. ([#6](https://github.com/maxel01/vue-leaflet/issues/6)) ([bb198b2](https://github.com/maxel01/vue-leaflet/commit/bb198b2cf7e4b6b12391b06b431acbb8ebafc596))


### 🚧 Chores

* add leaflet dependencies and add eslint option ([#1](https://github.com/maxel01/vue-leaflet/issues/1)) ([92093e7](https://github.com/maxel01/vue-leaflet/commit/92093e7432b01d5828010ac76433bf233583a8bd))
* improve build ([#17](https://github.com/maxel01/vue-leaflet/issues/17)) ([7121e54](https://github.com/maxel01/vue-leaflet/commit/7121e54dd78381bd3ebab427cd878f9ca3360d14))
* Initialize new empty repo to prepare for the rewrite. ([6bb6db1](https://github.com/maxel01/vue-leaflet/commit/6bb6db1a33672b2a96cdf5132838627504c8fac6))
* Initialize the vue project with vite ([601e8f4](https://github.com/maxel01/vue-leaflet/commit/601e8f41350135cfef7e4d825321c533c80f78b6))
* prepare for release ([#22](https://github.com/maxel01/vue-leaflet/issues/22)) ([d53a2db](https://github.com/maxel01/vue-leaflet/commit/d53a2db6b1300051a286a2db2cb1f05ea05a6321))
* set npm-publish true ([bbd6b2e](https://github.com/maxel01/vue-leaflet/commit/bbd6b2e8d6b377d9b2a2f12eed606d186bac1be5))

# Changelog

## [1.0.0-beta.5](///compare/v1.0.0-beta.4...v1.0.0-beta.5) (2025-12-14)

### 📝 Documentation

* improve typing for array and union types ([#154](https://github.com/maxel01/vue-leaflet/issues/154)) ([c5da15c](https://github.com/maxel01/vue-leaflet/commit/c5da15c092402571c8dd87a7057f10a6615c73cc))

### 🚧 Chores

* **LTileLayer:** add `tileLayerClass` from vue2-leaflet ([#153](https://github.com/maxel01/vue-leaflet/issues/153)) ([4914713](https://github.com/maxel01/vue-leaflet/commit/4914713611dcfccbb5b9c63b79ffe5c90a90ea57))

## [1.0.0-beta.4](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2025-12-06)

### ✨ Features

* **debug:** Adding name to the components option ([#150](https://github.com/maxel01/vue-leaflet/issues/150)) ([506bebc](https://github.com/maxel01/vue-leaflet/commit/506bebc5d145cf6cebb37e6d6ab0313bfe2fde64))

## [1.0.0-beta.3](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2025-11-16)

### ⚠ BREAKING CHANGES

* **interactiveLayer:** rename `bubblingMouseEvents` to `bubblingPointerEvents` in `interactiveLayer`

### ✨ Features

* **docs:** update vitepress to v2 ([#136](https://github.com/maxel01/vue-leaflet/issues/136)) ([663e2c9](https://github.com/maxel01/vue-leaflet/commit/663e2c9bba74d73c780de73d4ed79595cea5e723))

### 📝 Documentation

* add analytics to get usage overview ([#120](https://github.com/maxel01/vue-leaflet/issues/120)) ([300bc1b](https://github.com/maxel01/vue-leaflet/commit/300bc1b65cac7f739fa49398f73a10465285e6b5))
* remove comment in `LVideoOverlay` demo ([#112](https://github.com/maxel01/vue-leaflet/issues/112)) ([4db5023](https://github.com/maxel01/vue-leaflet/commit/4db502376abc45eefbcf392a9c45f736cfbba7be))

### ♻️ Refactoring

* **interactiveLayer:** rename `bubblingMouseEvents` to `bubblingPointerEvents` ([#113](https://github.com/maxel01/vue-leaflet/issues/113)) ([519c764](https://github.com/maxel01/vue-leaflet/commit/519c7641049dd9a34c60022317f135be29db9e48))
* replace `import x` with `import type x` where applicable ([#114](https://github.com/maxel01/vue-leaflet/issues/114)) ([488d1e9](https://github.com/maxel01/vue-leaflet/commit/488d1e9e782ee5e1eb8a408aa400243fbee83745))

### 🚧 Chores

* configure groups for minor and patch dependencies ([#128](https://github.com/maxel01/vue-leaflet/issues/128)) ([a108b7d](https://github.com/maxel01/vue-leaflet/commit/a108b7dc1aac5d32609a9a79580eacbe046667a5))

## [1.0.0-beta.2](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2025-10-08)

### ✨ Features

* **LSVGOverlay:** add slot for the `SVGElement` ([#92](https://github.com/maxel01/vue-leaflet/issues/92)) ([3fc3bab](https://github.com/maxel01/vue-leaflet/commit/3fc3bab7228d067a1b089a111e880fd0e5b77573))
* **LVideoOverlay:** add slot for the `HtmlVideoElement` ([#94](https://github.com/maxel01/vue-leaflet/issues/94)) ([dd7e506](https://github.com/maxel01/vue-leaflet/commit/dd7e50619c688257a04750303c956d1ea6bf1246))

### 🐛 Bug Fixes

* **LIcon:** LIcon uses Icon instead of DivIcon if the slot is empty ([#68](https://github.com/maxel01/vue-leaflet/issues/68)) ([70ab213](https://github.com/maxel01/vue-leaflet/commit/70ab213a35c1b7bf2069701d87f87d7f5e9beda2))
* **tests:** move remaining props to the wrapper folder ([#69](https://github.com/maxel01/vue-leaflet/issues/69)) ([8b9cc67](https://github.com/maxel01/vue-leaflet/commit/8b9cc672a0e28e7d55a738edabc9b1cfe8053563))

### 📝 Documentation

* add a short migration guide ([#104](https://github.com/maxel01/vue-leaflet/issues/104)) ([bda8862](https://github.com/maxel01/vue-leaflet/commit/bda8862642492bc478ea3530e2944cd80e1ed1cd))
* add detailed information to select the version used in the playgrounds. ([#103](https://github.com/maxel01/vue-leaflet/issues/103)) ([f123641](https://github.com/maxel01/vue-leaflet/commit/f123641d4573f97e704085bd98afba122349d777))
* add links on components introduction page ([#93](https://github.com/maxel01/vue-leaflet/issues/93)) ([db24f65](https://github.com/maxel01/vue-leaflet/commit/db24f65c2739be4c4991da14f5747fcd4cc9803a))
* add v1 plugins compatibility to README.md ([#105](https://github.com/maxel01/vue-leaflet/issues/105)) ([6eb7eca](https://github.com/maxel01/vue-leaflet/commit/6eb7eca046f82302555a89e72eece88571d1c84e))
* fix component name in comment ([#95](https://github.com/maxel01/vue-leaflet/issues/95)) ([15a1184](https://github.com/maxel01/vue-leaflet/commit/15a118453d7b70f8d7ee725f1165036c1d0fd2f2))

### ♻️ Refactoring

* add generics to all `Props` and `Emits` ([#91](https://github.com/maxel01/vue-leaflet/issues/91)) ([d953407](https://github.com/maxel01/vue-leaflet/commit/d9534073dc1f39fbd3886d138ad7922edff2478f))

### 🚧 Chores

* add ci workflow for PRs ([#72](https://github.com/maxel01/vue-leaflet/issues/72)) ([8c5d350](https://github.com/maxel01/vue-leaflet/commit/8c5d350f2fbaf780477d2e6e6debde9d2bd87a1d))
* add pnpm caching to ci ([#90](https://github.com/maxel01/vue-leaflet/issues/90)) ([1ed64b1](https://github.com/maxel01/vue-leaflet/commit/1ed64b1e713e4e05386c5d3dbeebd195a735cb45))
* fix formatting errors ([#73](https://github.com/maxel01/vue-leaflet/issues/73)) ([0e591c4](https://github.com/maxel01/vue-leaflet/commit/0e591c45647df25b5b31f656c7669c4963571b88))
* improve release ([#111](https://github.com/maxel01/vue-leaflet/issues/111)) ([1ab30db](https://github.com/maxel01/vue-leaflet/commit/1ab30dbda6753f47b18bee2332cce18588470d35))
* update dependabot.yml ([#81](https://github.com/maxel01/vue-leaflet/issues/81)) ([2d77b25](https://github.com/maxel01/vue-leaflet/commit/2d77b25f732fa17e5d5d02c4384f8a9315256ce8))
* **vue-playground:** remove unused code ([#102](https://github.com/maxel01/vue-leaflet/issues/102)) ([e4015bb](https://github.com/maxel01/vue-leaflet/commit/e4015bb2018b147d3327e2e994218f0ac71b2d17))

## [1.0.0-beta.1](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-beta...v1.0.0-beta.1) (2025-09-02)


### 🐛 Bug Fixes

* **docs:** demo and src are working in `getting-started/usage` ([1e344e7](https://github.com/maxel01/vue-leaflet/commit/1e344e7691ccb3c7afb4e50ec9fee9497b9adad1))


### 📝 Documentation

* add SSR and contribution guide ([#63](https://github.com/maxel01/vue-leaflet/issues/63)) ([5fcd104](https://github.com/maxel01/vue-leaflet/commit/5fcd104171b7d5aa0506d79391a278cbd66cd460))


### 🚧 Chores

* **build:** improve build and playground deps ([#60](https://github.com/maxel01/vue-leaflet/issues/60)) ([4528ef1](https://github.com/maxel01/vue-leaflet/commit/4528ef1ba354624a1a3f0b05b65b94d6a6fc0598))
* **docs:** remove duplicated part from `README.md` ([#66](https://github.com/maxel01/vue-leaflet/issues/66)) ([ab62645](https://github.com/maxel01/vue-leaflet/commit/ab6264560859368a3aba539e39b2f73772bf97f8))
* **docs:** remove emojis from tab titles ([#65](https://github.com/maxel01/vue-leaflet/issues/65)) ([df1c90c](https://github.com/maxel01/vue-leaflet/commit/df1c90c6ae276c3239f28cae77a92c34a57d6fbd))
* remove plugins related files ([#59](https://github.com/maxel01/vue-leaflet/issues/59)) ([d312b1a](https://github.com/maxel01/vue-leaflet/commit/d312b1a13f6367b2a4d742585874b51d422d1485))


### ✅ Tests

* add modular test structure to provide helper functions for vue-leaflet-plugins ([#62](https://github.com/maxel01/vue-leaflet/issues/62)) ([e112885](https://github.com/maxel01/vue-leaflet/commit/e1128858312c20ca41cc9ecaafbdbc4a6c56ba83))

## [1.0.0-beta](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-alpha.2...v1.0.0-beta) (2025-08-28)


### ⚠ BREAKING CHANGES

* deprecates unreachable code (see #56)
* **types:** remove IMapBlueprint

### ✨ Features

* add support for plugins ([#58](https://github.com/maxel01/vue-leaflet/issues/58)) ([514e62d](https://github.com/maxel01/vue-leaflet/commit/514e62d8753624f6769f04cf9fe356cb1c570ed1))
* **docs:** add automatic deployment to vitepress ([#51](https://github.com/maxel01/vue-leaflet/issues/51)) ([e772109](https://github.com/maxel01/vue-leaflet/commit/e7721098b1a55a9719c303b797e8121a46139109))


### 🐛 Bug Fixes

* **build:** remove terser plugin to allow tree-shaking again ([#50](https://github.com/maxel01/vue-leaflet/issues/50)) ([44605e8](https://github.com/maxel01/vue-leaflet/commit/44605e8c9098ecbce06538002755dc45bb506774))
* revert change from [#37](https://github.com/maxel01/vue-leaflet/issues/37) in utils.ts which caused a lost context when calling the setter method of a leaflet object. ([#53](https://github.com/maxel01/vue-leaflet/issues/53)) ([5b28cdc](https://github.com/maxel01/vue-leaflet/commit/5b28cdc855b98196df4b756fdc1cc0ddeeab4513))


### 🚧 Chores

* format files ([#57](https://github.com/maxel01/vue-leaflet/issues/57)) ([bf85dbd](https://github.com/maxel01/vue-leaflet/commit/bf85dbd92195e66ebd266e88647c968b83e6ce8b))
* **types:** simplify types and improve type hints in LMap ([#55](https://github.com/maxel01/vue-leaflet/issues/55)) ([7e9d9ca](https://github.com/maxel01/vue-leaflet/commit/7e9d9ca0cc1af0e0ff616024eb5b021c6bd859c7))


### ✅ Tests

* add more tests for reactive prop changes ([#54](https://github.com/maxel01/vue-leaflet/issues/54)) ([aba6b60](https://github.com/maxel01/vue-leaflet/commit/aba6b60305a6f3a1170f02ea1462850e5a31c33a))
* add remaining tests for all components to increase the coverage ([#56](https://github.com/maxel01/vue-leaflet/issues/56)) ([cb9331b](https://github.com/maxel01/vue-leaflet/commit/cb9331b5b2eea8d93e873b33c702def1b2dcb5e4))
* add tests for all components and config.ts ([#52](https://github.com/maxel01/vue-leaflet/issues/52)) ([01b1a9d](https://github.com/maxel01/vue-leaflet/commit/01b1a9d989c8f9fd7ca97147c76301bd839cc01b))

## [1.0.0-alpha.2](https://github.com/maxel01/vue-leaflet/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2025-08-16)


### ✨ Features

* add experimental flags and two new experimental features ([#48](https://github.com/maxel01/vue-leaflet/issues/48)) ([6775c99](https://github.com/maxel01/vue-leaflet/commit/6775c995ad72877ab26a0173fa5d931f26176852))
* add playground in vue and in nuxt ([#49](https://github.com/maxel01/vue-leaflet/issues/49)) ([ed29667](https://github.com/maxel01/vue-leaflet/commit/ed2966788af10addb21f4ad645b6670734301be4))


### 🐛 Bug Fixes

* **tests:** fix failing tests ([#44](https://github.com/maxel01/vue-leaflet/issues/44)) ([67f7503](https://github.com/maxel01/vue-leaflet/commit/67f75032aa0989c6f581e7033b9c91d02ea98237))


### 📝 Documentation

* add documentation to the components and create the vitepress app ([#38](https://github.com/maxel01/vue-leaflet/issues/38)) ([24f055b](https://github.com/maxel01/vue-leaflet/commit/24f055b39e9e6db9fff62eb32b25a2c313c74dfa))
* auto-generate docs using jsdoc comments ([#40](https://github.com/maxel01/vue-leaflet/issues/40)) ([1a794aa](https://github.com/maxel01/vue-leaflet/commit/1a794aaaa99e02ac39856aaa1f76b37a64010a6f))


### 🚧 Chores

* fix TypeScript-related errors ([#47](https://github.com/maxel01/vue-leaflet/issues/47)) ([3f8d455](https://github.com/maxel01/vue-leaflet/commit/3f8d455f0afb4d9de758f46b13edb059bf87d8e7))
* fix TypeScript-related errors in utils.ts ([#37](https://github.com/maxel01/vue-leaflet/issues/37)) ([74c0cd5](https://github.com/maxel01/vue-leaflet/commit/74c0cd5ced2f574f144529eba777b7ba49dcaf05))
* improve build and publishing ([#36](https://github.com/maxel01/vue-leaflet/issues/36)) ([0b7dc6d](https://github.com/maxel01/vue-leaflet/commit/0b7dc6dd75e2493d4fa2d81f993a222cc650e56b))
* use alias imports ([#42](https://github.com/maxel01/vue-leaflet/issues/42)) ([21c2376](https://github.com/maxel01/vue-leaflet/commit/21c2376d76ebee9ee91f7f1e27510841ce12b28b))

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

---
outline: [2,3]
---


# Contribution Guide

> A comprehensive guide on contributing to vue-leaflet, including project structure, development workflow, and best practices.

We welcome all contributions through bug reports, pull requests, and feedback to help make this library even better.

::: danger Before You Report
Before reporting a bug or requesting a feature, make sure that you have read through our [documentation](https://maxel01.github.io/vue-leaflet/) and existing [issues](https://github.com/Maxel01/vue-leaflet/issues).
:::

## Project Structure

Here's an overview of the key directories and files in the vue-leaflet project structure:

### Documentation

The documentation lives in the `docs` folder as a Vitepress app to generate pages from Markdown files. See the [Vitepress documentation](https://vitepress.dev/) for details on how it works.

### Wrapper

The wrapper code resides in the `src` folder. Here's a breakdown of its structure:

```bash
├── components/
│   ├── LCircle.vue        # Where all the components are located
│   ├── LCircleMarker.vue  
│   └── ...
├── functions/
│   ├── cirlce.ts        # Where all the component functions are located
│   ├── cirlcemarker.ts  
│   └── ...
├── types/
├── config.ts
├── lib.ts
└── utils.ts
```

## Create a new Component

If you want to create new components, look at the implementation of `LCircleMarker` and make yourself familiar with the functions used. Follow the style of this file and add the necessary comments to allow auto-generating docs.

Each component has **2 files**: `components/LComponent.vue` and `functions/component.ts`

### Document the Component

Writing the documentation for a component can look like this:

``` js
/**
 * Write a description of the compoenent here. Look at other components for examples.
 * @demo circle-marker {15-19}
 */
defineOptions({})
```

`defineOptions` is necessary, so `vue-docgen-api` can parse the documentation properly.

- The `@demo` tag is very important and includes a demo map in the doc page.
- `circle-marker` is the page defined in the playground. Keep the playground component as short as possible.
- `{15-19}` is the highlighted text of your playground component. Highlight only lines that are directly connected to the component.

If you don't know how to document the component properly, check out other components or reach out in the discussions.

#### Props
The props are defined in the `functions/component.ts`. Make sure that you extend the right props: \
The component extends `CircleMarker` -> extend `circleMarkerProps`. \
That's the same for every other interface declared in `functions/component.ts`.

You don't need to add every property, just the most important ones. You can always place all other options in `options`.

Every property needs to have a tag. Available tags are:
- `@reactive`: you made your property reactive, e.g. with propsBinder
- `@reactive native`: your property is reactive by default
- `@initOnly`: your property is not reactive and is used in setup only

These tags are also important for the tests.

### Test the component

When adding a new component, add tests to make sure everything works. The tests should:
- cover every line of code
- include these tests:
  - `testEmitsReady` (or something similar)
  - `testComponentPropBindings`
  - `testPropsBindingToLeaflet`
  - `testRemoveLayerOnUnmount` (or something similar)

#### `testPropsBindingToLeaflet`
This function tests the reactivity system if changes apply to the `leafletObject`.

The structure of the props is as follows (see `ReactiveProps`):

``` js
property: 'new value'
```
or if you want to test **multiple** changes:
``` js
property: {
    values: ['new', 'values']
}
```
If your test does not succeed directly, it is possible to change the checks if necessary:
``` js
expecting: {
    property(leafletObject, ...) {
        expect(...)....
    }
}
```

## Submit a Pull Request (PR)

Before you start, check if there's an existing issue describing the problem or feature request you're working on. If there is, please leave a comment on the issue to let us know you're working on it.

If there isn't, open a new issue to discuss the problem or feature.

### Local Development

To begin local development, follow these steps:

#### Clone the `vue-leaflet` repository to your local machine

```sh
git clone https://github.com/Maxel01/vue-leaflet.git
```

#### Install dependencies

```sh
pnpm install
```

#### Start development

- To work on the **documentation** located in the `docs` folder, run:

```sh
pnpm docs:dev
```

- To test the vue-leaflet components using the **playground**, run:

```sh
pnpm dev
```

- To test the components using the Vue **playground**, run:

```sh
pnpm dev:vue
```

### Type Checking

We use TypeScript for type checking. You can use the `type-check` command to check for type errors:

```sh
pnpm type-check
```

### Testing

Before submitting a PR, ensure that you run the tests:

```sh
pnpm test
```

### Commit Conventions

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, which allows a changelog to be auto-generated based on the commits. Please read the [guide](https://www.conventionalcommits.org/en/v1.0.0/#summary) through if you aren't familiar with it already.

- Use `fix` and `feat` for code changes that affect functionality or logic
- Use `docs` for documentation changes and `chore` for maintenance tasks

### Making a Pull Request

- Ensure your PR's title adheres to the [Conventional Commits](https://www.conventionalcommits.org/) since it will be used once the code is merged.
- Multiple commits are fine; no need to rebase or force push. We'll use `Squash and Merge` when merging.
- Ensure `lint`, `typecheck` and `tests` work before submitting the PR. Avoid making unrelated changes.
- Use `format` before submitting the changes.

We'll review it promptly. If assigned to a maintainer, they'll review it carefully.

## Thanks

Thank you again for being interested in this project! You are awesome! ❤️

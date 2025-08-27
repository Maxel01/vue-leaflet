### 📦 Export Integrity Tests

This folder contains tests that validate the structure and accessibility of public exports — such as those defined in
`lib.ts` or `components/index.ts`. These tests ensure that all components, utilities, and modules are properly exposed
and can be imported without error.

> ⚠️ **Important note on coverage:**  
> Code coverage tools may report artificially high coverage when running export tests. This happens because files are
> marked as "covered" simply by being imported — even if none of their internal logic is executed. As a result, components
> may appear to have 100% coverage despite not being functionally tested.

### ✅ For accurate coverage reporting

To ensure meaningful coverage metrics, run your **unit and integration tests separately** and **exclude export-only
tests** from coverage analysis. You can do this by updating your `vitest.config.ts` like so:

```ts
coverage: {
  exclude: ['tests/exports/**']
}
```

This keeps your coverage report focused on actual logic execution, not just import validation.

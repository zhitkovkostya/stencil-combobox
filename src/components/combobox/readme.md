# my-select



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute     | Description | Type               | Default          |
| ----------------- | ------------- | ----------- | ------------------ | ---------------- |
| `disabled`        | `disabled`    |             | `boolean`          | `false`          |
| `multiple`        | `multiple`    |             | `boolean`          | `false`          |
| `options`         | --            |             | `ComboboxOption[]` | `[]`             |
| `placeholder`     | `placeholder` |             | `string`           | `'Select value'` |
| `selectedOptions` | --            |             | `ComboboxOption[]` | `[]`             |


## Events

| Event       | Description | Type               |
| ----------- | ----------- | ------------------ |
| `my-change` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- [my-chip](../chip)

### Graph
```mermaid
graph TD;
  my-combobox --> my-chip
  style my-combobox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

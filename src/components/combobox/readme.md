# my-select



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute     | Description | Type      | Default          |
| ---------------- | ------------- | ----------- | --------- | ---------------- |
| `defaultOptions` | --            |             | `any[]`   | `[]`             |
| `isClearable`    | `clearable`   |             | `boolean` | `false`          |
| `isDisabled`     | `disabled`    |             | `boolean` | `false`          |
| `isMultiple`     | `multiple`    |             | `boolean` | `false`          |
| `isOrdered`      | `ordered`     |             | `boolean` | `false`          |
| `isRequired`     | `required`    |             | `boolean` | `false`          |
| `label`          | `label`       |             | `string`  | `null`           |
| `placeholder`    | `placeholder` |             | `string`  | `'Select value'` |


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

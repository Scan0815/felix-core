# file-upload



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type      | Default     |
| ---------- | ---------- | ----------- | --------- | ----------- |
| `accept`   | `accept`   |             | `string`  | `"image/*"` |
| `capture`  | --         |             | `null`    | `null`      |
| `multiple` | `multiple` |             | `boolean` | `false`     |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `selected` |             | `CustomEvent<any>` |


## Methods

### `select() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [flx-auth-login](../../auth/login)
 - [flx-auth-reset-password](../../auth/reset-password)
 - [flx-auth-sign-up](../../auth/sign-up)
 - [flx-file-stack-transfer](../stack-transfer)

### Graph
```mermaid
graph TD;
  flx-auth-login --> flx-file-upload
  flx-auth-reset-password --> flx-file-upload
  flx-auth-sign-up --> flx-file-upload
  flx-file-stack-transfer --> flx-file-upload
  style flx-file-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

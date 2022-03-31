# auth-reset-password



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                                                                                                                                                                                                                                                                                                               | Default |
| ------------------ | ------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `confirmationCode` | `confirmation-code` |             | `string`                                                                                                                                                                                                                                                                                                                           | `''`    |
| `i18n`             | --                  |             | `{ retype: { label: string; placeholder: string; errors: { required: string; minlen: string; equal: string; }; }; password: { change: string; label: string; placeholder: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; }` | `i18n`  |
| `userId`           | `user-id`           |             | `string`                                                                                                                                                                                                                                                                                                                           | `''`    |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `resetSubmit`  |             | `CustomEvent<any>` |
| `resetSuccess` |             | `CustomEvent<any>` |


## Methods

### `resetErrors() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-list
- ion-item
- ion-label
- ion-input
- [flx-auth-info-item](../info-item)
- ion-button
- [flx-file-upload](../../file/upload)
- ion-alert

### Graph
```mermaid
graph TD;
  flx-auth-reset-password --> ion-list
  flx-auth-reset-password --> ion-item
  flx-auth-reset-password --> ion-label
  flx-auth-reset-password --> ion-input
  flx-auth-reset-password --> flx-auth-info-item
  flx-auth-reset-password --> ion-button
  flx-auth-reset-password --> flx-file-upload
  flx-auth-reset-password --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  flx-auth-info-item --> ion-item
  flx-auth-info-item --> ion-icon
  flx-auth-info-item --> ion-label
  ion-button --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style flx-auth-reset-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

# auth-reset-password



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                                                                                                                                                                                                                                                                                                               | Default     |
| ------------------ | ------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `confirmationCode` | `confirmation-code` |             | `string`                                                                                                                                                                                                                                                                                                                           | `undefined` |
| `i18n`             | --                  |             | `{ retype: { label: string; placeholder: string; errors: { required: string; minlen: string; equal: string; }; }; password: { change: string; label: string; placeholder: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; }` | `i18n`      |
| `resetErrors`      | `reset-errors`      |             | `number`                                                                                                                                                                                                                                                                                                                           | `undefined` |
| `userId`           | `user-id`           |             | `string`                                                                                                                                                                                                                                                                                                                           | `undefined` |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `resetSubmit`  |             | `CustomEvent<any>` |
| `resetSuccess` |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- ion-list
- ion-item
- ion-label
- ion-input
- ion-button
- ion-alert

### Graph
```mermaid
graph TD;
  auth-reset-password --> ion-list
  auth-reset-password --> ion-item
  auth-reset-password --> ion-label
  auth-reset-password --> ion-input
  auth-reset-password --> ion-button
  auth-reset-password --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-button --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style auth-reset-password fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

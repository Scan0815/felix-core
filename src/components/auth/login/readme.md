# auth-login



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                                                                                                                                                                                                                                                                                                                                                     | Default |
| -------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `i18n`   | --        |             | `{ login: string; identifier: { label: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; password: { label: string; forgot: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; }` | `i18n`  |
| `mode`   | `mode`    |             | `"ios" \| "md"`                                                                                                                                                                                                                                                                                                                                                                          | `"md"`  |


## Events

| Event           | Description | Type               |
| --------------- | ----------- | ------------------ |
| `loginError`    |             | `CustomEvent<any>` |
| `loginProgress` |             | `CustomEvent<any>` |
| `loginReset`    |             | `CustomEvent<any>` |
| `loginSuccess`  |             | `CustomEvent<any>` |
| `signUp`        |             | `CustomEvent<any>` |


## Methods

### `resetErrors() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [flx-auth-info-item](../info-item)
- ion-button
- ion-label
- ion-spinner
- ion-alert

### Graph
```mermaid
graph TD;
  flx-auth-login --> flx-auth-info-item
  flx-auth-login --> ion-button
  flx-auth-login --> ion-label
  flx-auth-login --> ion-spinner
  flx-auth-login --> ion-alert
  flx-auth-info-item --> ion-item
  flx-auth-info-item --> ion-icon
  flx-auth-info-item --> ion-label
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-button --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style flx-auth-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

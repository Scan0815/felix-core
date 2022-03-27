# auth-sign-up



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default                                                    |
| -------------- | --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `avatarUpload` | `avatar-upload` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `false`                                                    |
| `data`         | --              |             | `IRegister`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `{     name: '',     identifier: '',     password: ''   }` |
| `i18n`         | --              |             | `{ signUp: string; confirm: string; name: { label: string; errors: { badword: string; required: string; minlen: string; exists: string; username: string; notvalid: string; alphaspace: string; }; }; identifier: { label: string; confirm: { message: string; button: string; }; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; password: { label: string; forgot: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; }` | `i18n`                                                     |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `signUpNotApproved` |             | `CustomEvent<any>` |
| `signUpProgress`    |             | `CustomEvent<any>` |
| `signUpSuccess`     |             | `CustomEvent<any>` |


## Methods

### `resetErrors() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-list
- ion-item
- [flx-file-upload](../../file/upload)
- [flx-file-stack-avatar](../../file/stack-avatar)
- ion-button
- ion-spinner
- ion-icon
- [flx-auth-info-item](../info-item)
- ion-buttons
- ion-toggle
- ion-label
- ion-alert

### Graph
```mermaid
graph TD;
  flx-auth-sign-up --> ion-list
  flx-auth-sign-up --> ion-item
  flx-auth-sign-up --> flx-file-upload
  flx-auth-sign-up --> flx-file-stack-avatar
  flx-auth-sign-up --> ion-button
  flx-auth-sign-up --> ion-spinner
  flx-auth-sign-up --> ion-icon
  flx-auth-sign-up --> flx-auth-info-item
  flx-auth-sign-up --> ion-buttons
  flx-auth-sign-up --> ion-toggle
  flx-auth-sign-up --> ion-label
  flx-auth-sign-up --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  flx-file-stack-avatar --> ion-avatar
  flx-file-stack-avatar --> ion-text
  flx-file-stack-avatar --> ion-router-link
  ion-button --> ion-ripple-effect
  flx-auth-info-item --> ion-item
  flx-auth-info-item --> ion-icon
  flx-auth-info-item --> ion-label
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style flx-auth-sign-up fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

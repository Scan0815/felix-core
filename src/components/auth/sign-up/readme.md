# auth-sign-up



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default                                                    |
| -------------- | --------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `avatarUpload` | `avatar-upload` |             | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `undefined`                                                |
| `data`         | --              |             | `IRegister`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `{     name: '',     identifier: '',     password: ''   }` |
| `i18n`         | --              |             | `{ signUp: string; confirm: string; name: { label: string; errors: { badword: string; required: string; minlen: string; exists: string; username: string; notvalid: string; alphaspace: string; }; }; identifier: { label: string; confirm: { message: string; button: string; }; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; password: { label: string; forgot: string; errors: { required: string; minlen: string; email: string; exists: string; identical: string; noaccountfound: string; notvalid: string; }; }; }` | `i18n`                                                     |
| `resetErrors`  | `reset-errors`  |             | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `undefined`                                                |


## Events

| Event               | Description | Type               |
| ------------------- | ----------- | ------------------ |
| `signUpNotApproved` |             | `CustomEvent<any>` |
| `signUpProgress`    |             | `CustomEvent<any>` |
| `signUpSuccess`     |             | `CustomEvent<any>` |


## Dependencies

### Depends on

- ion-list
- ion-item
- [file-upload](../../file/upload)
- [file-stack-avatar](../../file/stack-avatar)
- ion-button
- ion-spinner
- ion-icon
- ion-buttons
- ion-toggle
- ion-label
- ion-alert

### Graph
```mermaid
graph TD;
  auth-sign-up --> ion-list
  auth-sign-up --> ion-item
  auth-sign-up --> file-upload
  auth-sign-up --> file-stack-avatar
  auth-sign-up --> ion-button
  auth-sign-up --> ion-spinner
  auth-sign-up --> ion-icon
  auth-sign-up --> ion-buttons
  auth-sign-up --> ion-toggle
  auth-sign-up --> ion-label
  auth-sign-up --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  file-stack-avatar --> ion-avatar
  file-stack-avatar --> ion-text
  file-stack-avatar --> file-stack-image
  file-stack-avatar --> ion-router-link
  ion-button --> ion-ripple-effect
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style auth-sign-up fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

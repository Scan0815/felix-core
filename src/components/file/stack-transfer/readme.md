# file-stack-transfer



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                 | Default     |
| --------- | --------- | ----------- | -------------------- | ----------- |
| `account` | --        |             | `IUser \| undefined` | `undefined` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `uploadFinished` |             | `CustomEvent<any>` |


## Methods

### `openUploadMenu() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Depends on

- ion-item
- ion-avatar
- ion-img
- ion-icon
- ion-progress-bar
- ion-label
- [flx-file-upload](../upload)
- ion-alert

### Graph
```mermaid
graph TD;
  flx-file-stack-transfer --> ion-item
  flx-file-stack-transfer --> ion-avatar
  flx-file-stack-transfer --> ion-img
  flx-file-stack-transfer --> ion-icon
  flx-file-stack-transfer --> ion-progress-bar
  flx-file-stack-transfer --> ion-label
  flx-file-stack-transfer --> flx-file-upload
  flx-file-stack-transfer --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style flx-file-stack-transfer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

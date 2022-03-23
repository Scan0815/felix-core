# file-stack-transfer



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type    | Default     |
| --------- | --------- | ----------- | ------- | ----------- |
| `account` | --        |             | `IUser` | `undefined` |


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
- ion-alert

### Graph
```mermaid
graph TD;
  file-stack-transfer --> ion-item
  file-stack-transfer --> ion-avatar
  file-stack-transfer --> ion-img
  file-stack-transfer --> ion-icon
  file-stack-transfer --> ion-progress-bar
  file-stack-transfer --> ion-label
  file-stack-transfer --> ion-alert
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  ion-alert --> ion-ripple-effect
  ion-alert --> ion-backdrop
  style file-stack-transfer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

# file-stack-avatar



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type      | Default                               |
| ------------- | ------------- | ----------- | --------- | ------------------------------------- |
| `avatar`      | --            |             | `IAvatar` | `null`                                |
| `background`  | `background`  |             | `any`     | `'var(--ion-color-primary, #3880ff)'` |
| `color`       | `color`       |             | `any`     | `'#ffffff'`                           |
| `ext`         | `ext`         |             | `string`  | `'jpg'`                               |
| `height`      | `height`      |             | `number`  | `200`                                 |
| `imgTitle`    | `img-title`   |             | `string`  | `''`                                  |
| `link`        | `link`        |             | `string`  | `undefined`                           |
| `name`        | `name`        |             | `string`  | `''`                                  |
| `placeholder` | `placeholder` |             | `string`  | `null`                                |
| `width`       | `width`       |             | `number`  | `200`                                 |


## Dependencies

### Used by

 - [auth-sign-up](../../auth/sign-up)

### Depends on

- ion-avatar
- ion-text
- [file-stack-image](../stack-image)
- ion-router-link

### Graph
```mermaid
graph TD;
  file-stack-avatar --> ion-avatar
  file-stack-avatar --> ion-text
  file-stack-avatar --> file-stack-image
  file-stack-avatar --> ion-router-link
  auth-sign-up --> file-stack-avatar
  style file-stack-avatar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

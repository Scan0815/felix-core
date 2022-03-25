# flx-auth-info-item



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                                                                                                         | Default     |
| -------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`  | `color`   |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning" \| undefined` | `undefined` |
| `icon`   | `icon`    |             | `string \| undefined`                                                                                                        | `undefined` |
| `infos`  | --        |             | `string[]`                                                                                                                   | `[]`        |


## Dependencies

### Used by

 - [flx-auth-login](../login)
 - [flx-auth-reset-password](../reset-password)

### Depends on

- ion-item
- ion-icon
- ion-label

### Graph
```mermaid
graph TD;
  flx-auth-info-item --> ion-item
  flx-auth-info-item --> ion-icon
  flx-auth-info-item --> ion-label
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  ion-item --> ion-note
  flx-auth-login --> flx-auth-info-item
  flx-auth-reset-password --> flx-auth-info-item
  style flx-auth-info-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

# file-stack-video



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                       | Default      |
| ------------------ | -------------------- | ----------- | -------------------------- | ------------ |
| `autoAspectRatio`  | `auto-aspect-ratio`  |             | `boolean`                  | `true`       |
| `autoPlayVideo`    | `auto-play-video`    |             | `boolean`                  | `true`       |
| `fileStack`        | --                   |             | `IFileStack \| undefined`  | `undefined`  |
| `fullScreenButton` | `full-screen-button` |             | `boolean`                  | `true`       |
| `loopVideo`        | `loop-video`         |             | `boolean`                  | `true`       |
| `muteButton`       | `mute-button`        |             | `boolean`                  | `false`      |
| `mutedVideo`       | `muted-video`        |             | `boolean`                  | `true`       |
| `onlyPreview`      | `only-preview`       |             | `boolean`                  | `false`      |
| `preload`          | `preload`            |             | `string`                   | `'metadata'` |
| `rootElement`      | --                   |             | `HTMLElement \| undefined` | `undefined`  |
| `showControls`     | `show-controls`      |             | `boolean`                  | `false`      |
| `srcVideo`         | `src-video`          |             | `string \| undefined`      | `undefined`  |
| `trackViewTimeout` | --                   |             | `null`                     | `null`       |
| `volume`           | `volume`             |             | `number`                   | `0.7`        |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `trackViewVideo` |             | `CustomEvent<any>` |


## Methods

### `switchMuteState() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- ion-fab
- ion-fab-button
- ion-icon
- ion-spinner
- ion-buttons
- ion-button
- ion-progress-bar

### Graph
```mermaid
graph TD;
  flx-file-stack-video --> ion-fab
  flx-file-stack-video --> ion-fab-button
  flx-file-stack-video --> ion-icon
  flx-file-stack-video --> ion-spinner
  flx-file-stack-video --> ion-buttons
  flx-file-stack-video --> ion-button
  flx-file-stack-video --> ion-progress-bar
  ion-fab-button --> ion-icon
  ion-fab-button --> ion-ripple-effect
  ion-button --> ion-ripple-effect
  style flx-file-stack-video fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*

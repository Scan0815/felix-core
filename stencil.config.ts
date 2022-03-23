import { Config } from '@stencil/core';
import {sass} from "@stencil/sass";

export const config: Config = {
  namespace: 'felix-core',
  enableCache: true,
  hashFileNames: false,
  autoprefixCss: false,
  minifyCss: true,
  extras: {
    // We need the following for IE11 and old Edge:
    cssVarsShim: true,
    dynamicImportShim: true,
    // We don’t use shadow DOM so this is not needed:
    shadowDomShim: false,
    // Setting the below option to “true” will actually break Safari 10 support:
    safari10: false,
    // This is to tackle an Angular specific performance issue:
    initializeNextTick: true,
    // Don’t need any of these so setting them to “false”:
    scriptDataOpts: false,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    slotChildNodesFix: false,
  },
  buildEs5: 'prod',
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'custom-element',
      empty: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};

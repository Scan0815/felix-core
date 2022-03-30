import { Config } from '@stencil/core';
import {sass} from "@stencil/sass";

export const config: Config = {
  namespace: 'felix-core',
  enableCache: true,
  autoprefixCss: true,
  minifyCss: true,
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    scriptDataOpts: true
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
      type: 'dist-hydrate-script'
    },
  ],
  globalScript: 'src/global/felix-global.ts',
};

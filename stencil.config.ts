import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'z-ui',
  plugins: [
    sass()
  ],
  globalStyle: 'src/globals/globals.scss',
  outputTargets:[
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: null
    },
    {
      type: 'docs-readme'
    }
  ],
  preamble: '© z-ui - MIT License',
};

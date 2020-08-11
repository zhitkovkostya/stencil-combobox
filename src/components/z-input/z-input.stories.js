import {storiesOf} from '@storybook/html';
import { withKnobs, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('Components|z-input', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['z-input'] })
  .add('default', () => {
    const value = text('Value', 'Text');
    return `
      <z-input value="${value}"></z-input>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

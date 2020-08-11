import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('Components|z-label', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['z-label'] })
  .add('default', () => {
    const message = text('Text', 'Text');
    return `
      <z-label>${message}</z-label>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('colored', () => {
    const message = text('Text', 'Text');
    const color = select('Color', {
      '--': null,
      Green: 'green',
      Red: 'red',
      Blue: 'blue'
    }, 'gray');
    return `
      <z-label color="${color}">${message}</z-label>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('Label', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['label'] })
  .add('Default', () => {
    const message = text('Text', 'Text');
    return `
      <my-label>${message}</my-label>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Colored', () => {
    const message = text('Text', 'Text');
    const color = select('Color', {
      '--': null,
      Green: 'green',
      Red: 'red',
      Blue: 'blue'
    }, 'gray');
    return `
      <my-label color="${color}">${message}</my-label>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

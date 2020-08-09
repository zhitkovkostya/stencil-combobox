import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('Banner', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['banner'] })
  .add('Default', () => {
    const message = text('Text', 'Lorem ipsum dolor sit amet.');
    return `
      <my-banner>${message}</my-banner>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Colored', () => {
    const message = text('Text', 'Lorem ipsum dolor sit amet.');
    const color = select('Color', {
      Gray: 'gray',
      Green: 'green',
      Red: 'red',
      Blue: 'blue'
    }, 'gray');
    return `
      <my-banner color="${color}">${message}</my-banner>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

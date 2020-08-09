import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('z-banner', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['z-banner'] })
  .add('default', () => {
    const message = text('Text', 'Lorem ipsum dolor sit amet.');
    return `
      <z-banner>${message}</z-banner>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('colored', () => {
    const message = text('Text', 'Lorem ipsum dolor sit amet.');
    const color = select('Color', {
      Gray: 'gray',
      Green: 'green',
      Red: 'red',
      Blue: 'blue'
    }, 'gray');
    return `
      <z-banner color="${color}">${message}</z-banner>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

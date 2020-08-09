import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('z-button', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['z-button'] })
  .add('default', () => {
    const message = text('Text', 'Button');
    return `
      <z-button>${message}</z-button>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('colored', () => {
    const message = text('Text', 'Button');
    const color = select('Color', {
      Primary: 'primary',
      Secondary: 'secondary',
      Red: 'red',
      Green: 'green'
    }, 'primary');
    return `
      <z-button color="${color}">${message}</z-button>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

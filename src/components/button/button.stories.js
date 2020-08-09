import {storiesOf} from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';

import readme from './readme.md';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addParameters({ jest: ['button'] })
  .add('Default', () => {
    const message = text('Text', 'Button');
    return `
      <my-button>${message}</my-button>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Colored', () => {
    const message = text('Text', 'Button');
    const color = select('Color', {
      Primary: 'primary',
      Secondary: 'secondary',
      Red: 'red',
      Green: 'green'
    }, 'primary');
    return `
      <my-button color="${color}">${message}</my-button>
    `
  }, {
    notes: {
      markdown: readme
    }
  });

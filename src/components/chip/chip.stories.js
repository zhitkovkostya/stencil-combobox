import {storiesOf} from '@storybook/html';
import {withActions} from '@storybook/addon-actions';

import readme from './readme.md';

storiesOf('Chip', module)
  .addDecorator(withActions('my-chip-delete'))
  .addParameters({ jest: ['chip'] })
  .add('Default', () => {
    const el = document.createElement('my-chip');

    el.innerText = 'Chip';

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



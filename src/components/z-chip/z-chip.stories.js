import {storiesOf} from '@storybook/html';
import {withActions} from '@storybook/addon-actions';

import readme from './readme.md';

storiesOf('Components/z-chip', module)
  .addDecorator(withActions('z-chip-dismiss'))
  .addParameters({ jest: ['z-chip'] })
  .add('default', () => {
    const el = document.createElement('z-chip');

    el.innerText = 'Chip';

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('dismissible', () => {
    const el = document.createElement('z-chip');

    el.innerText = 'Chip';
    el.isDismissible = true;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



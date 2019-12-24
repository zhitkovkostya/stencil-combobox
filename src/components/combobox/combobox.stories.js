import {storiesOf} from '@storybook/html';
import {withActions} from '@storybook/addon-actions';

import readme from './readme.md';

const options = [
  {id: 1, text: 'Argentina'},
  {id: 2, text: 'Australia'},
  {id: 3, text: 'Brazil'},
  {id: 4, text: 'Canada'},
  {id: 5, text: 'China'},
  {id: 6, text: 'France'},
  {id: 7, text: 'Germany'},
  {id: 8, text: 'India'},
  {id: 9, text: 'Mexico'},
  {id: 10, text: 'Russia'},
  {id: 11, text: 'United States'}
];

storiesOf('ComboBox', module)
  .addDecorator(withActions('my-change'))
  .addParameters({ jest: ['combobox'] })
  .add('Default', () => {
    const el = document.createElement('my-combobox');

    el.options = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Filled', () => {
    const el = document.createElement('my-combobox');

    let optionsFilled = options.map(option => {
      option.selected = option.id === 1;

      return option;
    });

    el.options = optionsFilled;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



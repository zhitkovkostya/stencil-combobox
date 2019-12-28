import {storiesOf} from '@storybook/html';
import {withActions} from '@storybook/addon-actions';

import readme from './readme.md';

const options = [
  {value: 1, text: 'Argentina'},
  {value: 2, text: 'Australia'},
  {value: 3, text: 'Brazil'},
  {value: 4, text: 'Canada'},
  {value: 5, text: 'China'},
  {value: 6, text: 'France'},
  {value: 7, text: 'Germany'},
  {value: 8, text: 'India'},
  {value: 9, text: 'Mexico'},
  {value: 10, text: 'Russia'},
  {value: 11, text: 'United States'}
];

const selectedOptions = [
  {value: 1, text: 'Argentina'},
  {value: 2, text: 'Australia'}
];

storiesOf('ComboBox', module)
  .addDecorator(withActions('my-change'))
  .addDecorator(withActions('my-chip-delete'))
  .addParameters({ jest: ['combobox'] })
  .add('Single', () => {
    const el = document.createElement('my-combobox');

    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Filled', () => {
    const el = document.createElement('my-combobox');

    el.defaultOptions = options;
    el.selectedOptions = [selectedOptions[1]];

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Filled Disabled', () => {
    const el = document.createElement('my-combobox');

    el.isDisabled = true;
    el.defaultOptions = options;
    el.selectedOptions = [selectedOptions[1]];

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple', () => {
    const el = document.createElement('my-combobox');

    el.isMultiple = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple Filled', () => {
    const el = document.createElement('my-combobox');

    el.isMultiple = true;
    el.defaultOptions = options;
    el.selectedOptions = selectedOptions;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple Filled Disabled', () => {
    const el = document.createElement('my-combobox');

    el.isMultiple = true;
    el.isDisabled = true;
    el.defaultOptions = options;
    el.selectedOptions = selectedOptions;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



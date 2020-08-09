import {storiesOf} from '@storybook/html';
import {withActions} from '@storybook/addon-actions';

import readme from './readme.md';

const options = [
  {value: 'ar', text: 'Argentina'},
  {value: 'at', text: 'Australia'},
  {value: 'br', text: 'Brazil'},
  {value: 'ca', text: 'Canada'},
  {value: 'cn', text: 'China'},
  {value: 'fr', text: 'France'},
  {value: 'de', text: 'Germany'},
  {value: 'in', text: 'India'},
  {value: 'mx', text: 'Mexico'},
  {value: 'no', text: 'Norway'},
  {value: 'ru', text: 'Russia', selected: true},
  {value: 'ch', text: 'Switzerland'},
  {value: 'gb', text: 'United Kingdom'},
  {value: 'us', text: 'United States'}
];

const selectedOptions = [
  {value: 1, text: 'Argentina'},
  {value: 2, text: 'Australia'}
];

storiesOf('z-combobox', module)
  .addDecorator(withActions('z-change'))
  .addDecorator(withActions('z-chip-dismiss'))
  .addParameters({ jest: ['z-combobox'] })
  .add('single', () => {
    const el = document.createElement('z-combobox');

    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('single clearable', () => {
    const el = document.createElement('z-combobox');

    el.label = 'Label';
    el.isClearable = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('single labeled', () => {
    const el = document.createElement('z-combobox');

    el.label = 'Label';
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('single labeled required', () => {
    const el = document.createElement('z-combobox');

    el.label = 'Label';
    el.isRequired = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('single filled', () => {
    const el = document.createElement('z-combobox');

    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('single filled disabled', () => {
    const el = document.createElement('z-combobox');

    el.isDisabled = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('multiple', () => {
    const el = document.createElement('z-combobox');

    el.isMultiple = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('multiple clearable', () => {
    const el = document.createElement('z-combobox');

    el.isMultiple = true;
    el.isClearable = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('multiple filled', () => {
    const el = document.createElement('z-combobox');

    el.isMultiple = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('multiple filled disabled', () => {
    const el = document.createElement('z-combobox');

    el.isMultiple = true;
    el.isDisabled = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('multiple filled sorted', () => {
    const el = document.createElement('z-combobox');

    el.isMultiple = true;
    el.isOrdered = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



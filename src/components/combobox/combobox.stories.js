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

storiesOf('ComboBox', module)
  .addDecorator(withActions('my-change'))
  .addDecorator(withActions('my-chip-delete'))
  .addParameters({ jest: ['combobox'] })
  .add('Single', () => {
    const el = document.createElement('my-combobox');

    el.defaultOptions = options;
    el.clearSelection();

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Labeled', () => {
    const el = document.createElement('my-combobox');

    el.label = 'Label';
    el.defaultOptions = options;

    (async () => {
      await customElements.whenDefined('my-combobox');
      await el.clearSelection();
    })();

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Labeled Required', () => {
    const el = document.createElement('my-combobox');

    el.label = 'Label';
    el.isRequired = true;
    el.defaultOptions = options;
    el.clearSelection();

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Filled', () => {
    const el = document.createElement('my-combobox');

    el.defaultOptions = options;

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

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Single Filled With Options', () => `
    <my-combobox>
      ${options.map(option => `
        <option value="${option.value}" ${option.selected ? 'selected' : ''}>${option.text}</option>        
      `)}
    </my-combobox>
  `, {
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

    return el;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple Filled Sorted', () => {
    const el = document.createElement('my-combobox');

    el.isMultiple = true;
    el.isOrdered = true;
    el.defaultOptions = options;

    return el;
  }, {
    notes: {
      markdown: readme
    }
  });



import {storiesOf} from '@storybook/html';

import readme from './readme.md';

const demoBlockEl = (text) => `<div style="display: block; width: 100%; height: 24px; padding-left: 8px; background-color: var(--color-blue-1); border-radius: 4px; color: #fff">${text}</div>`;

storiesOf('z-grid', module)
  .addParameters({ jest: ['z-grid'] })
  .add('default', () => {
    return `
      <z-grid columns="12">
        <z-grid-cell span="1">${demoBlockEl(1)}</z-grid-cell>
        <z-grid-cell span="11">${demoBlockEl(11)}</z-grid-cell>
        <z-grid-cell span="2">${demoBlockEl(2)}</z-grid-cell>
        <z-grid-cell span="10">${demoBlockEl(10)}</z-grid-cell>
        <z-grid-cell span="3">${demoBlockEl(3)}</z-grid-cell>
        <z-grid-cell span="9">${demoBlockEl(9)}</z-grid-cell>
        <z-grid-cell span="4">${demoBlockEl(4)}</z-grid-cell>
        <z-grid-cell span="8">${demoBlockEl(8)}</z-grid-cell>
        <z-grid-cell span="5">${demoBlockEl(5)}</z-grid-cell>
        <z-grid-cell span="7">${demoBlockEl(7)}</z-grid-cell>
        <z-grid-cell span="6">${demoBlockEl(6)}</z-grid-cell>
        <z-grid-cell span="6">${demoBlockEl(6)}</z-grid-cell>
        <z-grid-cell span="row">${demoBlockEl('row')}</z-grid-cell>
      </z-grid>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('configurable', () => {
    return `
      <z-grid columns="8">
        <z-grid-cell>${demoBlockEl('')}</z-grid-cell>
        <z-grid-cell span="3">${demoBlockEl('3')}</z-grid-cell>
        <z-grid-cell>${demoBlockEl('')}</z-grid-cell>
        <z-grid-cell span="7-8">${demoBlockEl('7-8')}</z-grid-cell>
        <z-grid-cell span="2+2">${demoBlockEl('2+2')}</z-grid-cell>
        <z-grid-cell span="5-8">${demoBlockEl('5-8')}</z-grid-cell>
        <z-grid-cell span="1-4">${demoBlockEl('1-4')}</z-grid-cell>
        <z-grid-cell span="6..">${demoBlockEl('6..')}</z-grid-cell>
        <z-grid-cell span="2..">${demoBlockEl('2..')}</z-grid-cell>
        <z-grid-cell span="4..">${demoBlockEl('4..')}</z-grid-cell>
        <z-grid-cell span="1-2">${demoBlockEl('1-2')}</z-grid-cell>
        <z-grid-cell span="4-5">${demoBlockEl('4-5')}</z-grid-cell>
      </z-grid>
    `
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('responsive', () => {
    return `
      <z-grid columns="12">
        <z-grid-cell span="1-4" span-s="row" span-l="1-3">${demoBlockEl('row > 1-4 > 1-3')}</z-grid-cell>
        <z-grid-cell span="5-12" span-s="row" span-l="4-6">${demoBlockEl('row > 5-12 > 1-3')}</z-grid-cell>
        <z-grid-cell span="1-8" span-s="row" span-l="7-9">${demoBlockEl('row > 1-8 > 1-3')}</z-grid-cell>
        <z-grid-cell span="9-12" span-s="row" span-l="10-12">${demoBlockEl('row > 9-12 > 1-3')}</z-grid-cell>
      </z-grid>
    `
  }, {
    notes: {
      markdown: readme
    }
  });



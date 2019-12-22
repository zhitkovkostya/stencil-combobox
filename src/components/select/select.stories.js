import {storiesOf} from '@storybook/html';

// const options = [
//   {id: 1, title: 'Argentina', selected: true},
//   {id: 2, title: 'Australia', selected: false},
//   {id: 3, title: 'Brazil', selected: false},
//   {id: 4, title: 'Canada', selected: false},
//   {id: 5, title: 'China', selected: true},
//   {id: 6, title: 'France', selected: false},
//   {id: 7, title: 'Germany', selected: false},
//   {id: 8, title: 'India', selected: true},
//   {id: 9, title: 'Mexico', selected: false},
//   {id: 10, title: 'Russia', selected: false},
//   {id: 11, title: 'United States', selected: true}
// ];

storiesOf('Select', module)
  .addParameters({ jest: ['select'] })
  .add('Default Component', () => `
    <my-select>
      <li value="1" selected>Argentina</li>
      <li value="2">Australia</li>
      <li value="3">Brazil</li>
      <li value="4">Canada</li>
      <li value="5">China</li>
      <li value="6">France</li>
      <li value="7">Germany</li>
      <li value="8">India</li>
      <li value="9">Mexico</li>
      <li value="10">Russia</li>
      <li value="11">United States</li>
    </my-select>
  `);

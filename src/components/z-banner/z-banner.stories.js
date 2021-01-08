import readme from './readme.md';

export default {
  title: 'Components/z-banner',
  argTypes: {
    text: {
      type: {
        name: 'string'
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['sky', 'blue', 'green', 'yellow', 'red']
      }
    }
  }
}

const Template = ({ text, color }) => {
  return `<z-banner color="${color}">${text}</z-banner>`;
};

const text = 'Lorem ipsum dolor sit amet.';

export const Default = Template.bind({});
Default.args = { text: text, color: 'gray' };

export const Colored = Template.bind({});
Colored.args = { text: text, color: 'blue' };

import {storiesOf} from '@storybook/html';

storiesOf('Guidelines/Typography', module)
  .add('Display', () => `
    <h1>Display 1</h1>
    <h2>Display 2</h2>
    <h3>Display 3</h3>
  `)
  .add('Body', () => `
    <div>Body</div>
    <small>Body Small</small>
  `);

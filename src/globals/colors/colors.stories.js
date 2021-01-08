import {storiesOf} from '@storybook/html';

storiesOf('Guidelines/Colors', module)
  .add('Primary', () => `
    <z-grid columns="3">
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="white"></z-palette-item>
          <z-palette-item name="black"></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="ink-transcluent-20"></z-palette-item>
          <z-palette-item name="ink-transcluent-60"></z-palette-item>
          <z-palette-item name="ink-lighten-40"></z-palette-item>
          <z-palette-item name="ink-lighten-20"></z-palette-item>
          <z-palette-item name="ink" is-large></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="sky-transcluent-60"></z-palette-item>
          <z-palette-item name="sky-lighten-10"></z-palette-item>
          <z-palette-item name="sky-lighten-5"></z-palette-item>
          <z-palette-item name="sky" is-large></z-palette-item>
        </z-palette>      
      </z-grid-cell>
    </z-grid>
  `)
  .add('Secondary', () => `
    <z-grid columns="3">
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="green" is-large></z-palette-item>
          <z-palette-item name="green-darken-5"></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="yellow" is-large></z-palette-item>
          <z-palette-item name="yellow-darken-5"></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="red" is-large></z-palette-item>
          <z-palette-item name="red-darken-5"></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
        <z-palette>
          <z-palette-item name="purple" is-large></z-palette-item>
          <z-palette-item name="purple-darken-5"></z-palette-item>
        </z-palette>      
      </z-grid-cell>
      
      <z-grid-cell>
          <z-palette>
            <z-palette-item name="blue-transcluent-10"></z-palette-item>
            <z-palette-item name="blue" is-large></z-palette-item>
            <z-palette-item name="blue-darken-5"></z-palette-item>
          </z-palette>
      </z-grid-cell>
    </z-grid>
  `);

import { configure } from '@storybook/html';

const req = require.context('../src/components', true, /\.stories\.tsx?$/);

configure(req, module);

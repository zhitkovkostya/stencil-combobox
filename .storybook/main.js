const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const OUTPUT_DIR = '../dist';
const PROJECT_NAME = 'z-ui';

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-notes',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-jest',
    '@storybook/addon-a11y'
  ],
  // Custom webpack config to tell Storybook where to find the compiled files from Stencil
  async webpackFinal(config) {
    config.entry.push(path.join(__dirname, OUTPUT_DIR, `${PROJECT_NAME}.js`));
    fs.readdirSync(path.join(__dirname, OUTPUT_DIR, 'z-ui')).map(file => {
      const jsFilePath = path.join(__dirname, OUTPUT_DIR, `z-ui/${file}.js`);
      try {
        if (fs.existsSync(jsFilePath)) {
          config.entry.push(jsFilePath);
        }
      } catch (err) {
        console.error(err);
      }

      // Add CSS
      let cssFilePath = path.join(
        __dirname,
        OUTPUT_DIR,
        `z-ui/${file}.css`
      );
      try {
        if (fs.existsSync(cssFilePath)) {
          config.entry.push(cssFilePath);
        }
      } catch (err) {
        console.error(err);
      }
    });

    // Add all static files to Storybook
    config.plugins.push(
      new CopyPlugin([
        {
          from: '**/*',
          to: './',
          context: 'dist',
        },
      ])
    );

    // Write the files to disk and not to memory
    config.plugins.push(new WriteFilePlugin());

    return config;
  },
};

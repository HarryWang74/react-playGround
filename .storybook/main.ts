import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  typescript: {
    reactDocgen: false,
  },
};

export default config;

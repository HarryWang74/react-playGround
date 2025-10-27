import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Library/Button',
  component: Button,
  args: {
    label: 'Button',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic Variants
export const Text: Story = {
  args: {
    label: 'Text',
    variant: 'text',
  },
};

export const Contained: Story = {
  args: {
    label: 'Contained',
    variant: 'contained',
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined',
    variant: 'outlined',
  },
};

// Colors
export const ColorSecondary: Story = {
  args: {
    label: 'Secondary',
    color: 'secondary',
  },
};

export const ColorSuccess: Story = {
  args: {
    label: 'Success',
    variant: 'contained',
    color: 'success',
  },
};

export const ColorError: Story = {
  args: {
    label: 'Error',
    variant: 'outlined',
    color: 'error',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Small',
    size: 'small',
    variant: 'contained',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Medium',
    size: 'medium',
    variant: 'contained',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Large',
    size: 'large',
    variant: 'contained',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    variant: 'contained',
  },
};

export const DisableElevation: Story = {
  args: {
    label: 'Disable Elevation',
    variant: 'contained',
    disableElevation: true,
  },
};

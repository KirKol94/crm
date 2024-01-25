import {ButtonSize} from "../mode/types/button.ts";
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button.tsx';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: ButtonSize.S,
    children: 'Button',
  },
};

export const BigSize: Story = {
  args: {
    size: ButtonSize.M,
    children: 'Button',
  },
};

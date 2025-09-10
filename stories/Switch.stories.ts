import Switch from '@/components/common/Switch';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Middle: Story = {
  args: {
    size: 'middle',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Label: Story = {
  args: {
    id: 'test-label',
    label: 'TEST LABEL',
  },
};

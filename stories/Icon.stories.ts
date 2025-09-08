import { Dialog } from '@/components/common/Dialog';
import LucideIcon from '@/components/common/Icon';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Icon',
  component: LucideIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof LucideIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'ArrowBigDown',
  },
};

export const Size: Story = {
  args: {
    name: 'ArrowBigDown',
    size: 150,
  },
};

export const Color: Story = {
  args: {
    name: 'MoonStar',
    color: 'red',
  },
};

export const Fill: Story = {
  args: {
    name: 'Bell',
    fill: 'red',
  },
};

export const StrokeWidth: Story = {
  args: {
    name: 'LayoutPanelLeft',
    fill: '#ffffff',
    strokeWidth: 3,
  },
};

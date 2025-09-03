import { Dialog } from '@/components/common/Dialog';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

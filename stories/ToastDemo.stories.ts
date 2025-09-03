import { ToastDemo } from '@/components/common/Toast';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'ToastDemo',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

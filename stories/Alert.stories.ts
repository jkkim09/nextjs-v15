import Alert from '@/components/common/Alert';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: [''],
  args: {},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

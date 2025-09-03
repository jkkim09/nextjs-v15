import { Calendar } from '@/components/common/Calendar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

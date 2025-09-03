import { Skeleton } from '@/components/common/Skeleton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

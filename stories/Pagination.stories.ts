import { Pagination } from '@/components/common/Pagination';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

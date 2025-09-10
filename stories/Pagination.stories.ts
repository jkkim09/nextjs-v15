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
  args: {
    limit: 10,
    total: 17,
  },
};

export const Limit: Story = {
  args: {
    limit: 3,
    total: 17,
  },
};

export const ActiveIndex: Story = {
  args: {
    limit: 10,
    total: 17,
    activeIndex: 12,
  },
};

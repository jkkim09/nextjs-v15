import TestSelect from '@/components/TestSelect';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Select',
  component: TestSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TestSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

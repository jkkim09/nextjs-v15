import { DatePicker } from '@/components/common/DatePicker';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {},
};

export const Range: Story = {
  args: {
    mode: 'range',
  },
};

export const Multi: Story = {
  args: {
    mode: 'multiple',
  },
};

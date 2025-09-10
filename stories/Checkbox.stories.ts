import Checkbox from '@/components/common/Checkbox';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Label: Story = {
  args: {
    id: 'test1',
    label: 'test label',
  },
};

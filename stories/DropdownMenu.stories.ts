import { DropdownMenu } from '@/components/common/DropdownMenu';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: [''],
  args: {},
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

import Alert from '@/components/common/Alert';
import HtmlEditor from '@/components/common/HtmlEditor';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'HtmlEditor',
  component: HtmlEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof HtmlEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

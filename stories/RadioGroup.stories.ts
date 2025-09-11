import Alert from '@/components/common/Alert';
import RadioGroup from '@/components/common/RadioGroup';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  {
    label: 'test1',
    value: 1,
  },
  {
    label: 'test2',
    value: 2,
  },
  {
    label: 'test3',
    value: 3,
  },
  {
    label: 'test4',
    value: 4,
  },
];

export const Base: Story = {
  args: {
    items: ITEMS,
  },
};

export const Column: Story = {
  args: {
    items: ITEMS,
    name: 'column',
    align: 'column',
  },
};

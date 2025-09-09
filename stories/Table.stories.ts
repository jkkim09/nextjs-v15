import Table, { TableHeader } from '@/components/common/Table';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

interface RowData {
  id: number;
  name: string;
  value: string;
  children?: RowData[];
}

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const headers: TableHeader<any>[] = [
  {
    key: 'name',
    label: '이름',
    width: 200,
  },
  { key: 'value', label: '값' },
];

const data: RowData[] = [
  {
    id: 1,
    name: '루트 1',
    value: '100',
    children: [
      { id: 2, name: '자식 1-1', value: '200' },
      {
        id: 3,
        name: '자식 1-2',
        value: '300',
        children: [
          {
            id: 4,
            name: '손자 1-2-1',
            value: '400',
            children: [
              {
                id: 5,
                name: '손자 1-2-1-1',
                value: '800',
              },
            ],
          },
        ],
      },
    ],
  },
  { id: 5, name: '루트 2', value: '500' },
];

export const Primary: Story = {
  args: {
    headers,
    data,
  },
};

export const Tree: Story = {
  args: {
    useTree: true,
    headers,
    data,
  },
};

export const CheckBox: Story = {
  args: {
    useCheckBox: true,
    headers,
    data,
  },
};

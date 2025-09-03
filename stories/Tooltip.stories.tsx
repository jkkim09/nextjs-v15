import Button from '@/components/common/Button';
import Tooltip from '@/components/common/Tooltip';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  title: 'Tooltip',
  component: Tooltip, // ✅ Tooltip 자체를 지정
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    content: 'This is a tooltip', // 기본 props 설정
    children: <Button>Hover me</Button>, // children 도 args 로 넣을 수 있음
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 스토리 별로 props를 덮어씌울 수 있음ㄴ
export const Top: Story = {
  args: {
    position: 'top',
  },
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
  },
};

'use client';

import { useState } from 'react';
import { SortableTree } from '../_components/TestFree';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

const initialData: TreeNode[] = [
  {
    id: '1',
    name: '📂 Root 1',
    children: [
      { id: '1-1', name: '📄 Child 1-1' },
      { id: '1-2', name: '📄 Child 1-2' },
    ],
  },
  {
    id: '2',
    name: '📂 Root 2',
    children: [
      { id: '2-1', name: '📄 Child 2-1' },
      {
        id: '2-2',
        name: '📂 Nested Folder',
        children: [{ id: '2-2-1', name: '📄 Deep Child' }],
      },
    ],
  },
];

const DndTreePage = () => {
  const [items, setItems] = useState<TreeNode[]>(initialData);
  return (
    <div>
      <SortableTree<TreeNode>
        items={items}
        onChange={setItems}
        renderItem={(item) => (
          <div className="flex items-center gap-2 p-2 border rounded bg-white shadow-sm">
            <SortableTree.DragHandle />
            <span>{item.name}</span>
          </div>
        )}
      />
    </div>
  );
};

export default DndTreePage;

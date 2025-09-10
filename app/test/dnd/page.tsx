'use client';

import { SortableList } from '@/components/testSortTree/SortableList';
import { useDraggable } from '@dnd-kit/core';

import {
  SimpleTreeItemWrapper,
  SortableTree,
  TreeItemComponentProps,
  TreeItems,
} from 'dnd-kit-sortable-tree';
import React from 'react';
import { useState } from 'react';

type MinimalTreeItemData = {
  value: string;
};

const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
  {
    id: 1,
    value: 'Jane',
    children: [
      { id: 4, value: 'John' },
      { id: 5, value: 'Sally' },
    ],
  },
  { id: 2, value: 'Fred', children: [{ id: 6, value: 'Eugene' }] },
  { id: 3, value: 'Helen' },
];

const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
  return (
    <SimpleTreeItemWrapper {...props} ref={ref}>
      <div>{props.item.value}:TEST</div>
    </SimpleTreeItemWrapper>
  );
});

const DnDPage = () => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: 'unique-id',
  });

  const [sortItems, setSortItems] = useState(initialViableMinimalData);

  const [items, setItems] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  return (
    <div>
      <section>
        <div style={{ maxWidth: 400, margin: '30px auto' }}>
          <SortableList
            items={items}
            onChange={setItems}
            renderItem={(item) => (
              <SortableList.Item id={item.id}>
                <SortableList.DragHandle />
                {item.id}:TEST2
              </SortableList.Item>
            )}
          />
        </div>
      </section>

      <section>
        <SortableTree
          items={sortItems}
          onItemsChanged={setSortItems}
          TreeItemComponent={TreeItem}
        />
      </section>
    </div>
  );
};

export default DnDPage;

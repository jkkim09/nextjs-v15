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
import DndGrid from './_components/DndGrid';

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
  const { handleProps, ...arg } = props;
  return (
    <SimpleTreeItemWrapper
      ref={ref}
      showDragHandle={false}
      {...arg}
      className="test"
    >
      <div>
        <span {...handleProps}>||||</span> {props.item.value}:TEST
      </div>
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
                <ul>
                  <li>TEST1</li>
                  <li>Test2</li>
                </ul>
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
      {/*  */}
      <section>
        <DndGrid />
      </section>
    </div>
  );
};

export default DnDPage;

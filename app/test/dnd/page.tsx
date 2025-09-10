'use client';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

const SortableItem = ({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 border mb-1 bg-white"
    >
      {children}
    </div>
  );
};

const DnDPage = () => {
  const items = ['A', 'B', 'C'];
  const [sortItems, setItems] = useState(initialViableMinimalData);
  return (
    <div>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id}>
            {id}
          </SortableItem>
        ))}
      </SortableContext>

      <section>
        <SortableTree
          items={sortItems}
          onItemsChanged={setItems}
          TreeItemComponent={TreeItem}
        />
      </section>
    </div>
  );
};

export default DnDPage;

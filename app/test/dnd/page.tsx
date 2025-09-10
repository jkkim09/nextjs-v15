'use client';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {items.map((id) => (
        <SortableItem key={id} id={id}>
          {id}
        </SortableItem>
      ))}
    </SortableContext>
  );
};

export default DnDPage;

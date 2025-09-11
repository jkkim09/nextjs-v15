'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Item {
  id: string;
  parent: string | null;
  children?: Item[];
}

const initialData: Item[] = [
  {
    id: '1.1',
    parent: null,
    children: [
      { id: '2.1', parent: '1.1' },
      {
        id: '2.2',
        parent: '1.1',
        children: [
          { id: '3.1', parent: '2.2' },
          { id: '3.2', parent: '2.2' },
        ],
      },
      { id: '2.3', parent: '1.1' },
      { id: '2.4', parent: '1.1' },
    ],
  },
  { id: '1.2', parent: null },
  { id: '1.3', parent: null },
];

// ✅ 트리 탐색: 특정 id 찾기
function findItemById(tree: Item[], id: string): Item | null {
  for (const node of tree) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findItemById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

// ✅ 트리에서 특정 id 제거하고 반환
function removeItem(tree: Item[], id: string): [Item | null, Item[]] {
  const newTree: Item[] = [];
  let removed: Item | null = null;

  for (const node of tree) {
    if (node.id === id) {
      removed = { ...node };
      continue;
    }
    if (node.children) {
      const [childRemoved, newChildren] = removeItem(node.children, id);
      if (childRemoved) {
        removed = childRemoved;
        newTree.push({ ...node, children: newChildren });
        continue;
      }
    }
    newTree.push(node);
  }

  return [removed, newTree];
}

// ✅ 특정 부모에 자식 추가
function insertItem(tree: Item[], parentId: string | null, item: Item): Item[] {
  if (parentId === null) {
    return [...tree, { ...item, parent: null }];
  }

  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children ?? []), { ...item, parent: parentId }],
      };
    }
    if (node.children) {
      return { ...node, children: insertItem(node.children, parentId, item) };
    }
    return node;
  });
}

// ✅ SortableItem (재귀 렌더링)
const SortableItem: React.FC<{ item: Item }> = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="my-1"
    >
      <div
        className={`p-3 flex items-center gap-x-3 cursor-move border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80 ${
          item.parent ? 'bg-base-200/60' : 'bg-base-100'
        }`}
      >
        Item {item.id}
        <span className="icon-[tabler--grip-vertical] ms-auto size-4 shrink-0"></span>
      </div>

      {item.children && item.children.length > 0 && (
        <div className="ml-6 mt-1">
          <SortableContext
            items={item.children.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {item.children.map((child) => (
              <SortableItem key={child.id} item={child} />
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

// ✅ Main Component
const TestDnd: React.FC = () => {
  const [items, setItems] = useState<Item[]>(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) {
      setActiveId(null);
      return;
    }

    setItems((prev) => {
      // 1. active item 제거
      const [removed, withoutActive] = removeItem(prev, activeId);
      if (!removed) return prev;

      // 2. over item 밑에 붙이기
      const newTree = insertItem(withoutActive, overId, removed);

      return newTree;
    });

    setActiveId(null);
  };

  const activeItem = activeId ? findItemById(items, activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        {items.map((item) => (
          <SortableItem key={item.id} item={item} />
        ))}
      </SortableContext>

      <DragOverlay>
        {activeItem ? (
          <div className="p-3 border rounded-lg bg-white shadow">
            Item {activeItem.id}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TestDnd;

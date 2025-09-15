'use client';

import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  type DropAnimation,
  type Active,
  type UniqueIdentifier,
  DragOverEvent,
} from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

// ───────────────────────────────
// 타입 정의
// ───────────────────────────────
export interface TreeItem {
  id: UniqueIdentifier;
  children?: TreeItem[];
}

export interface SortableTreeProps<T extends TreeItem> {
  items: T[];
  onChange(items: T[]): void;
  renderItem(item: T): ReactNode;
  maxDepth?: number;
}

// ───────────────────────────────
// 드래그 애니메이션 설정
// ───────────────────────────────
const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.5', transform: 'scale(1.05)' } },
  }),
};

interface Context {
  attributes: Record<string, any>;
  listeners: any;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

// ───────────────────────────────
// SortableItem & DragHandle
// ───────────────────────────────
export function SortableItem2({
  children,
  id,
}: PropsWithChildren<{ id: UniqueIdentifier }>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const context = useMemo(
    () => ({ attributes, listeners, ref: setActivatorNodeRef }),
    [attributes, listeners, setActivatorNodeRef]
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li ref={setNodeRef} style={style} className="SortableItem">
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle2() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  return (
    <button {...attributes} {...listeners} ref={ref} className="DragHandle">
      ☰
    </button>
  );
}

// ───────────────────────────────
// RecursiveSortableList
// ───────────────────────────────
function RecursiveSortableList<T extends TreeItem>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem(item: T): ReactNode;
}) {
  return (
    <SortableContext items={items.map((i) => i.id)}>
      <ul className="SortableList ml-4">
        {items.map((item) =>
          item.id === '__placeholder__' ? (
            <li
              key={item.id}
              className="h-10 border border-dashed rounded my-1"
            />
          ) : (
            <React.Fragment key={item.id}>
              <SortableItem2 id={item.id}>{renderItem(item)}</SortableItem2>
              {item.children && item.children.length > 0 && (
                <RecursiveSortableList
                  items={item.children}
                  renderItem={renderItem}
                />
              )}
            </React.Fragment>
          )
        )}
      </ul>
    </SortableContext>
  );
}

// ───────────────────────────────
// 헬퍼 함수들
// ───────────────────────────────
function findItem<T extends TreeItem>(
  list: T[],
  id: UniqueIdentifier
): { item: T; parent: T[] } | null {
  for (const i of list) {
    if (i.id === id) return { item: i, parent: list };
    if (i.children) {
      const found = findItem(i.children as T[], id);
      if (found) return found;
    }
  }
  return null;
}

function getDepth<T extends TreeItem>(
  list: T[],
  id: UniqueIdentifier,
  depth = 1
): number | null {
  for (const i of list) {
    if (i.id === id) return depth;
    if (i.children) {
      const d = getDepth(i.children as T[], id, depth + 1);
      if (d) return d;
    }
  }
  return null;
}

function removeItem<T extends TreeItem>(list: T[], id: UniqueIdentifier): T[] {
  return list
    .map((i) => {
      if (i.id === id) return null;
      if (i.children)
        return { ...i, children: removeItem(i.children as T[], id) };
      return i;
    })
    .filter(Boolean) as T[];
}

function insertItem<T extends TreeItem>(
  list: T[],
  parentId: UniqueIdentifier | null,
  item: T
): T[] {
  if (parentId === null) return [...list, item];
  return list.map((i) => {
    if (i.id === parentId)
      return { ...i, children: [...(i.children ?? []), item] };
    if (i.children)
      return { ...i, children: insertItem(i.children as T[], parentId, item) };
    return i;
  });
}

function insertPlaceholder<T extends TreeItem>(
  list: T[],
  parentId: UniqueIdentifier,
  placeholderId: string
): T[] {
  return list.map((i) => {
    if (i.id === parentId) {
      return { ...i, children: [...(i.children ?? []), { id: placeholderId }] };
    }
    if (i.children) {
      return {
        ...i,
        children: insertPlaceholder(i.children as T[], parentId, placeholderId),
      };
    }
    return i;
  });
}

function removePlaceholder<T extends TreeItem>(list: T[]): T[] {
  return list
    .map((i) => {
      if (i.id === '__placeholder__') return null;
      if (i.children)
        return { ...i, children: removePlaceholder(i.children as T[]) };
      return i;
    })
    .filter(Boolean) as T[];
}

// ───────────────────────────────
// 메인 컴포넌트
// ───────────────────────────────
export function SortableTree<T extends TreeItem>({
  items,
  onChange,
  renderItem,
  maxDepth = 2,
}: SortableTreeProps<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = active ? findItem(items, active.id)?.item : undefined;

  const overlayStyle: CSSProperties = {
    transformOrigin: 'top left',
    transition: 'all 0.25s ease',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    borderRadius: 8,
    background: 'white',
    padding: '4px',
  };

  return (
    <DndContext
      onDragStart={({ active }) => setActive(active)}
      onDragOver={({ active, over }: DragOverEvent) => {
        if (!over || active.id === over.id) return;

        const activeData = findItem(items, active.id);
        const overData = findItem(items, over.id);
        if (!activeData || !overData) return;

        const overDepth = getDepth(items, over.id) ?? 1;
        if (overDepth + 1 <= maxDepth) {
          let newItems = removePlaceholder(items);
          newItems = insertPlaceholder(newItems, over.id, '__placeholder__');
          onChange(newItems);
        }
      }}
      onDragEnd={({ active, over }) => {
        let newItems = removePlaceholder(items);
        if (over && active.id !== over.id) {
          const activeData = findItem(items, active.id);
          if (activeData) {
            newItems = insertItem(newItems, over.id, activeData.item);
          }
        }
        onChange(newItems);
        setActive(null);
      }}
      onDragCancel={() => setActive(null)}
    >
      <RecursiveSortableList items={items} renderItem={renderItem} />
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeItem && (
          <div
            style={overlayStyle}
            className="transition-transform duration-200 ease-in-out scale-105"
          >
            {renderItem(activeItem as T)}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

// ───────────────────────────────
// 하위 컴포넌트 할당
// ───────────────────────────────
SortableTree.Item = SortableItem2;
SortableTree.DragHandle = DragHandle2;

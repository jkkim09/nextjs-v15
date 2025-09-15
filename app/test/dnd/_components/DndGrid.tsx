'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

const SortableItem = (props: {
  id: string;
  value: string;
  isOverlay?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const isWide = props.id === '5'; // 가로 2칸
  const isTall = props.id === '10'; // 세로 2칸
  const full = props.id === '13';

  const style: React.CSSProperties = {
    // transform: CSS.Transform.toString(transform),
    // transition: props.isOverlay ? undefined : transition, // overlay는 transition 불필요

    transform: props.isOverlay ? undefined : CSS.Transform.toString(transform),
    transition: props.isOverlay ? undefined : transition,
    opacity: isDragging ? 0 : 1,
    //
    width: isWide ? '210px' : full ? '210px' : '100px',
    height: isTall ? '210px' : full ? '210px' : '100px',
    borderRadius: '12px',
    backgroundColor: props.isOverlay ? '#ff7675' : '#74b9ff',
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: props.isOverlay
      ? '0 8px 16px rgba(0,0,0,0.25)'
      : '0 2px 6px rgba(0,0,0,0.15)',
    cursor: 'grab',
    // zIndex is important for the drag overlay to be on top
    zIndex: props.isOverlay ? 999 : 'auto',
    gridColumn: isWide ? 'span 2' : full ? 'span 2' : undefined,
    gridRow: isTall ? 'span 2' : full ? 'span 2' : undefined,
  };

  return (
    <div
      ref={props.isOverlay ? undefined : setNodeRef}
      style={style}
      {...(!props.isOverlay ? attributes : {})}
      {...(!props.isOverlay ? listeners : {})}
    >
      {props.value}
    </div>
  );
};

const DndGrid = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>();
  const [items, setItems] = useState(
    Array.from({ length: 30 }, (_, i) => i.toString())
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(undefined);
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(`${active.id}`);
        const newIndex = items.indexOf(`${over.id}`);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div
          style={{
            maxWidth: '210px',
            display: 'grid',
            gap: '5px',
            justifyItems: 'center',
          }}
        >
          {items.map((id) => (
            <SortableItem key={id} id={id} value={id} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay>
        {activeId ? (
          <SortableItem
            id={activeId.toString()}
            value={activeId.toString()}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndGrid;

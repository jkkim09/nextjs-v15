'use client';

import { cn } from '@/lib/utils';
import React, { useState, useMemo } from 'react';

// 트리 구조 타입
export interface TreeData<T> {
  id: string | number;
  children?: T[];
}

// 테이블 헤더 정의
export interface TableHeader<T> {
  key: keyof T;
  label: string;
  width?: number;
  render?: React.FC<{ row: T; index: number; level: number }>;
  headerRender?: React.FC<{ label: string }>;
  colSpan?: number;
  rowSpan?: number;
}

// 제네릭 테이블 Props
export interface TableProps<T extends TreeData<T>> {
  headers: TableHeader<T>[];
  data: T[];
  indent?: number;
  openIds?: (number | string)[];
  checked?: (number | string)[];
  useTree?: boolean;
  useCheckBox?: boolean;
  useDragAndDrop?: boolean;
}

// 모든 노드의 ID를 가져오는 헬퍼 함수
const getFlattenedIds = <T extends TreeData<T>>(
  rows: T[]
): (string | number)[] => {
  let ids: (string | number)[] = [];
  rows.forEach((r) => {
    ids.push(r.id);
    if (r.children) {
      ids = ids.concat(getFlattenedIds(r.children));
    }
  });
  return ids;
};

const Table = <T extends TreeData<T>>({
  headers,
  data,
  indent = 16,
  openIds,
  checked,
  useTree,
  useCheckBox,
}: TableProps<T>) => {
  const [openKeys, setOpenKeys] = useState<Set<string | number>>(
    new Set(openIds)
  );
  const [checkedKeys, setCheckedKeys] = useState<Set<string | number>>(
    new Set(checked)
  );

  // 모든 노드 ID를 useMemo로 최적화
  const allIds = useMemo(() => getFlattenedIds(data), [data]);

  // 모든 노드가 체크되었는지 확인
  const isAllChecked = useMemo(
    () => allIds.length > 0 && allIds.every((id) => checkedKeys.has(id)),
    [allIds, checkedKeys]
  );

  // 일부만 체크되었는지 확인 (전체 체크 상태가 아닐 때)
  const isIndeterminate = useMemo(
    () => !isAllChecked && allIds.some((id) => checkedKeys.has(id)),
    [isAllChecked, allIds, checkedKeys]
  );

  // 펼치기/접기 토글
  const toggleRow = (id: string | number) => {
    setOpenKeys((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // 노드와 모든 하위 노드의 체크 상태를 재귀적으로 설정
  const setChildrenChecked = (
    rows: T[],
    checked: boolean,
    prevCheckedKeys: Set<string | number>
  ): Set<string | number> => {
    const newSet = new Set(prevCheckedKeys);
    rows.forEach((r) => {
      if (checked) {
        newSet.add(r.id);
      } else {
        newSet.delete(r.id);
      }
      if (r.children) {
        setChildrenChecked(r.children, checked, newSet);
      }
    });
    return newSet;
  };

  // 체크 토글
  const toggleCheck = (item: T) => {
    setCheckedKeys((prev) => {
      const isCurrentlyChecked = prev.has(item.id);
      let newSet = new Set(prev);
      if (isCurrentlyChecked) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }

      if (item.children) {
        newSet = setChildrenChecked(item.children, !isCurrentlyChecked, newSet);
      }
      return newSet;
    });
  };

  // 전체 체크 토글
  const toggleCheckAll = () => {
    setCheckedKeys(isAllChecked ? new Set() : new Set(allIds));
  };

  // 행 렌더링
  const renderRows = (rows: T[], level: number): React.ReactNode =>
    rows.map((item, rowIndex) => {
      const isOpen = openKeys.has(item.id);
      const hasChildren = !!item.children?.length;
      const isChecked = checkedKeys.has(item.id);

      return (
        <React.Fragment key={`${level}-${item.id}`}>
          <tr>
            {/* 체크박스 열 */}
            {useCheckBox && (
              <td>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCheck(item)}
                />
              </td>
            )}

            {useTree && (
              <td style={{ paddingLeft: `${level * indent}px` }}>
                {hasChildren && (
                  <button
                    onClick={() => toggleRow(item.id)}
                    style={{
                      marginLeft: '4px',
                      cursor: 'pointer',
                      background: 'none',
                      border: 'none',
                    }}
                  >
                    {isOpen ? '▼' : '▶'}
                  </button>
                )}
              </td>
            )}

            {/* 데이터 열 */}
            {headers.map((header) => {
              const value = item[header.key];
              return (
                <td key={String(header.key)}>
                  {header.render ? (
                    <header.render row={item} index={rowIndex} level={level} />
                  ) : (
                    String(value ?? '')
                  )}
                </td>
              );
            })}
          </tr>
          {/* children 렌더링 */}
          {hasChildren && isOpen && renderRows(item.children!, level + 1)}
        </React.Fragment>
      );
    });

  return (
    <div
      className={cn(
        'table-container border-1 border-[#000] rounded-[8px] overflow-hidden'
      )}
    >
      <table className="w-full">
        <thead>
          <tr>
            {/* 전체 선택 체크박스 */}
            {useCheckBox && (
              <th>
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={toggleCheckAll}
                  ref={(el) => {
                    if (el) {
                      el.indeterminate = isIndeterminate;
                    }
                  }}
                />
              </th>
            )}
            {useTree && <th>Expand</th>}
            {headers.map((header) => (
              <th
                key={String(header.key)}
                colSpan={header.colSpan}
                rowSpan={header.rowSpan}
                style={{
                  width: header.width,
                }}
              >
                {header.headerRender ? (
                  <header.headerRender label={header.label} />
                ) : (
                  header.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows(data, 0)}</tbody>
      </table>
    </div>
  );
};

export default Table;

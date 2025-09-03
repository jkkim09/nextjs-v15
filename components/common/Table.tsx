'use client';

// T는 테이블 데이터의 타입을 나타내는 제네릭

export interface TableHeader<T> {
  key: keyof T;
  label: string;
  // render 속성을 추가하여 셀을 커스텀 컴포넌트로 렌더링
  // row: 현재 행의 데이터, index: 행의 인덱스
  render?: React.FC<{ row: T; index: number }>;
}

export interface TableProps<T> {
  headers: TableHeader<T>[];
  data: T[];
}

const Table = <T extends object>({ headers, data }: TableProps<T>) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={String(header.key)}>
                  {header.render ? (
                    // render 속성이 있으면 해당 컴포넌트를 렌더링
                    <header.render row={item} index={rowIndex} />
                  ) : (
                    // render 속성이 없으면 기본 렌더링
                    String(
                      item[header.key] !== undefined ? item[header.key] : ''
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

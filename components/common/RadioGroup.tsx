'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export interface RadioItem<T extends string | number> {
  label: React.ReactNode;
  value: T;
}

interface RadioGroupProps<T extends string | number> {
  name?: string;
  align?: 'row' | 'column';
  items: RadioItem<T>[];
  selectedValue?: T;
  onChange?: (value: T) => void;
}

const RadioGroup = <T extends string | number>({
  name = 'radioGroup',
  align = 'row',
  items,
  selectedValue,
  onChange,
}: RadioGroupProps<T>) => {
  const [value, setValue] = useState<T | undefined>(selectedValue);

  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  return (
    <fieldset
      className={cn(
        'flex max-w-max items-start',
        align === 'row' ? 'flex-row gap-3' : 'flex-col gap-1'
      )}
    >
      {items.map((item, index) => {
        return (
          <div
            key={`radio-${name}-${index}`}
            className={cn('flex gap-2 justify-center items-center')}
          >
            <input
              type="radio"
              id={`${name}-${index}`}
              name={name}
              value={item.value}
              checked={item.value === value}
              className={cn('size-4 cursor-pointer')}
              onChange={() => {
                if (selectedValue === undefined) {
                  setValue(item.value);
                }

                if (onChange) {
                  onChange(item.value);
                }
              }}
            />
            <label htmlFor={`${name}-${index}`} className="cursor-pointer">
              {item.label}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
};

export default RadioGroup;

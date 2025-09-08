'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Mode } from 'react-day-picker';
import { ko } from 'date-fns/locale';

// Mode별 selected 타입 정의
type ValueByMode<M extends Mode> = M extends 'single'
  ? Date | undefined
  : M extends 'multiple'
    ? Date[] | undefined
    : M extends 'range'
      ? { from?: Date; to?: Date } | undefined
      : never;

export interface DatePickerProps<M extends Mode = 'single'> {
  mode?: M | 'multiple' | 'range';
  onChange?: (value?: ValueByMode<M>) => void;
}

export function DatePicker<M extends Mode = 'single'>({
  mode = 'single' as M,
  onChange,
}: DatePickerProps<M>) {
  const [open, setOpen] = React.useState(false);

  // mode별 상태
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(
    undefined
  );
  const [multipleDates, setMultipleDates] = React.useState<Date[] | undefined>(
    undefined
  );
  const [rangeDates, setRangeDates] = React.useState<
    { from: Date; to: Date } | undefined
  >(undefined);

  // 버튼 라벨 렌더링
  const renderButtonLabel = () => {
    if (mode === 'single')
      return singleDate ? singleDate.toLocaleDateString() : 'Select date';
    if (mode === 'multiple')
      return multipleDates?.length
        ? multipleDates.map((d) => d.toLocaleDateString()).join(', ')
        : 'Select dates';
    if (mode === 'range') {
      if (!rangeDates) return 'Select range';
      const { from, to } = rangeDates;
      return `${from ? from.toLocaleDateString() : ''} - ${to ? to.toLocaleDateString() : ''}`;
    }
    return 'Select date';
  };

  // 선택 처리
  const handleSelect = (value: any) => {
    if (mode === 'single') {
      setSingleDate(value);
      onChange?.(value as ValueByMode<M>);
      setOpen(false);
    } else if (mode === 'multiple') {
      setMultipleDates(value);
      onChange?.(value as ValueByMode<M>);
    } else if (mode === 'range') {
      setRangeDates(value);
      onChange?.(value as ValueByMode<M>);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {renderButtonLabel()}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          {mode === 'single' && (
            <Calendar
              mode="single"
              locale={ko}
              selected={singleDate}
              captionLayout="dropdown"
              onSelect={(date: Date | undefined) => handleSelect(date)}
            />
          )}
          {mode === 'multiple' && (
            <Calendar
              mode="multiple"
              locale={ko}
              selected={multipleDates}
              captionLayout="dropdown"
              onSelect={(dates: Date[] | undefined) => handleSelect(dates)}
            />
          )}
          {mode === 'range' && (
            <Calendar
              mode="range"
              locale={ko}
              selected={rangeDates}
              captionLayout="dropdown"
              onSelect={(range: { from?: Date; to?: Date } | undefined) =>
                handleSelect(range)
              }
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

'use client';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useState } from 'react';

export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <CalendarComponent
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
  );
};

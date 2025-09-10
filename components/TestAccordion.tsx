import { cn } from '@/lib/utils';
import { useState } from 'react';

const TestAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number>();

  return (
    <div>
      <div className="border-b border-slate-200">
        <button className="w-full flex justify-between items-center py-5 text-slate-800">
          <span>What is Material Tailwind?</span>
          <span
            id="icon-1"
            className="text-slate-800 transition-transform duration-300"
            onClick={() => setOpenIndex(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </span>
        </button>
        <div
          id="content-1"
          className={cn(
            'max-h-0 overflow-hidden transition-all duration-300 ease-in-out',
            openIndex === 1 && 'max-h-[300px]'
          )}
        >
          <div className="pb-5 text-sm text-slate-500">
            Material Tailwind is a framework that enhances Tailwind CSS with
            additional styles and components.
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <button className="w-full flex justify-between items-center py-5 text-slate-800">
          <span>How to use Material Tailwind?</span>
          <span
            id="icon-2"
            className="text-slate-800 transition-transform duration-300"
            onClick={() => setOpenIndex(2)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </span>
        </button>
        <div
          id="content-2"
          className={cn(
            'max-h-0 overflow-hidden transition-all duration-300 ease-in-out',
            openIndex === 2 && 'max-h-[300px]'
          )}
        >
          <div className="pb-5 text-sm text-slate-500">
            You can use Material Tailwind by importing its components into your
            Tailwind CSS project.
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200">
        <button className="w-full flex justify-between items-center py-5 text-slate-800">
          <span>What can I do with Material Tailwind?</span>
          <span
            id="icon-3"
            className="text-slate-800 transition-transform duration-300"
            onClick={() => setOpenIndex(3)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </span>
        </button>
        <div
          id="content-3"
          className={cn(
            'max-h-0 overflow-hidden transition-all duration-300 ease-in-out',
            openIndex === 3 && 'max-h-[300px]'
          )}
        >
          <div className="pb-5 text-sm text-slate-500">
            Material Tailwind allows you to quickly build modern, responsive
            websites with a focus on design.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAccordion;

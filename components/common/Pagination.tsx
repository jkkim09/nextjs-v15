import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';

interface PaginationProps {
  limit: number;
  total: number;
  activeIndex?: number;
  onChange?: (paging: number) => void;
}

export const Pagination = ({
  limit,
  total,
  activeIndex = 1,
  onChange,
}: PaginationProps) => {
  // activeIndex에 맞춰 초기 page 계산
  const initialPage = Math.ceil(activeIndex / limit);

  const [page, setPage] = useState<number>(initialPage);
  const [pagingIndex, setPagingIndex] = useState<number>(activeIndex);

  const pagingLimit = useMemo(() => {
    return page * limit;
  }, [page, limit]);

  const nextDisable = useMemo(() => {
    return pagingIndex === total;
  }, [pagingIndex]);

  const prevDisable = useMemo(() => {
    return pagingIndex === 1;
  }, [pagingIndex]);

  const setPagingIndexHandler = (index: number) => {
    setPagingIndex(index);

    if (onChange) {
      onChange(index);
    }
  };

  const onClickPrev = () => {
    const prevIndex = pagingIndex - 1;

    if (
      prevIndex > 0 &&
      prevIndex <= pagingLimit &&
      (page - 1) * limit < prevIndex
    ) {
      setPagingIndexHandler(prevIndex);
    } else if (prevIndex > 0) {
      setPage(page - 1);
      setPagingIndexHandler(prevIndex);
    }
  };

  const onClickNext = () => {
    const nextIndex = pagingIndex + 1;

    if (nextIndex <= pagingLimit && nextIndex <= total) {
      setPagingIndexHandler(nextIndex);
    } else if (nextIndex <= total) {
      setPage(page + 1);
      setPagingIndexHandler(nextIndex);
    }
  };

  const onClickPaging = (paging: number) => {
    setPagingIndexHandler(paging);
  };

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem onClick={onClickPrev}>
          <PaginationPrevious
            className={cn({ 'opacity-20 cursor-not-allowed': prevDisable })}
          />
        </PaginationItem>
        {[...new Array(total)].map((_, index) => {
          const currentIndex = index + 1;

          return currentIndex > (page - 1) * limit &&
            currentIndex <= pagingLimit ? (
            <PaginationItem
              key={`paging-${index}`}
              onClick={() => onClickPaging(currentIndex)}
            >
              <PaginationLink isActive={currentIndex === pagingIndex}>
                {currentIndex}
              </PaginationLink>
            </PaginationItem>
          ) : null;
        })}
        {page * limit < total && <PaginationEllipsis />}
        <PaginationItem onClick={onClickNext}>
          <PaginationNext
            className={cn({ 'opacity-20 cursor-not-allowed': nextDisable })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
};

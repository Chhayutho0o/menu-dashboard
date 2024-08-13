import React from "react";
import { usePagination, DOTS } from "@/hooks/usePagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationUI = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    paginationRange === undefined ||
    paginationRange?.length < 2
  ) {
    return <div></div>;
  }

  const lastPage = paginationRange?.[paginationRange?.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <Pagination className="flex justify-start">
      <PaginationContent>
        <PaginationItem>
          <button
            className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex sm:h-9 h-7 sm:w-9 w-7 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            onClick={onPrevious}
            disabled={currentPage === 1}>
            <ChevronLeft strokeWidth={2} className="h-5 w-5" />
          </button>
        </PaginationItem>
        {paginationRange?.map((pageNumber: any, index: number) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={index} className="cursor-pointer">
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => onPageChange(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <button
            className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex sm:h-9 h-7 sm:w-9 w-7 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            onClick={onNext}
            disabled={currentPage === lastPage}>
            <ChevronRight strokeWidth={2} className="h-5 w-5" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationUI;

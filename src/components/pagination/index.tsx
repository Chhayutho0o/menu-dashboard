"use client";
import React from "react";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import PaginationUI from "./Pagination";
import { useRouter } from "@/hooks/useRouter";
import { usePathname } from "@/hooks/navigation";

interface PaginationProps {
  totalCount: number;
  perPage: number;
  searchParams: any;
  pageName?: string;
}

const Pagination = ({
  totalCount = 1,
  perPage = 1,
  searchParams,
  pageName = "page",
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onSelectPage = (page: any) => {
    router.push(
      pathname + "?" + createQueryString(pageName, page),
      { scroll: false },
      { showTheSameUrl: true }
    );
  };
  return (
    <PaginationUI
      currentPage={
        isEmpty(searchParams.page) ? 1 : Number(searchParams[pageName])
      }
      totalCount={totalCount}
      pageSize={perPage}
      onPageChange={onSelectPage}
      siblingCount={1}
    />
  );
};

export default Pagination;

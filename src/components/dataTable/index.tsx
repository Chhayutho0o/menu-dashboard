import React, { useCallback, useMemo, Fragment } from "react";
import dayjs from "dayjs";
import { get } from "lodash";
import { cn, currencyFormat } from "@/lib/utils";
import { formatCurrency } from "@/lib/currency";
import ImageLoader from "@/components/commons/ImageLoader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type COLUMNS = {
  label?: string;
  field?: string;
  type?: string;
  format?: string;
  renderLabel?: () => React.ReactNode;
  renderColumn?: (item: any) => React.ReactNode;
  className?: string;
  headerClass?: string;
};
type Props = {
  columns: COLUMNS[];
  className?: string;
  data?: any[];
  itemClassName?: string;
  renderEmpty?: () => React.ReactNode;
  emptyLabel?: string;
  wrapperClass?: string;
  meta?: any;
};

const DataTable: React.FC<Props> = ({
  columns,
  data = [],
  className,
  itemClassName,
  renderEmpty,
  emptyLabel = "There are no records",
  wrapperClass,
  meta,
}) => {
  const renderHeader = useMemo(() => {
    const results = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      results.push(
        <TableHead
          className={cn(
            "font-semibold border bg-secondary",
            column?.headerClass,
            column.type === "index" && "sticky left-0 drop-shadow-lg w-[70px]"
          )}
          key={i}
        >
          <div className={cn("px-2")}>
            {typeof column.renderLabel === "function"
              ? column.renderLabel()
              : column.label}
          </div>
        </TableHead>
      );
    }
    return (
      <TableHeader className={cn("text-xs text-gray-400 uppercase bg-white")}>
        <TableRow>{results}</TableRow>
      </TableHeader>
    );
  }, [columns]);

  const renderItemDetail = useCallback(
    (column: COLUMNS, value: any, index: number) => {
      if (column.type === "datetime") {
        if (!value) return "---";
        const format = column.format || "YYYY-MM-DD HH:mm";
        return dayjs.unix(value).format(format);
      }
      if (column.type === "date") {
        if (!value) return "---";
        const format = column.format || "YYYY-MM-DD";
        return dayjs.unix(value).format(format);
      }
      if (column.type === "index") {
        if (meta) {
          const { perPage, currentPage } = meta;
          return index + 1 + currentPage * perPage;
        }
        return index + 1;
      }
      if (column.type === "currency") {
        return currencyFormat(value);
      }

      if (column.type === "image") {
        return (
          <ImageLoader
            src={value}
            className="w-10 h-10"
            width={50}
            height={50}
          />
        );
      }
      if (column.type === "status") {
        if (
          value === "inactive" ||
          value === "fail" ||
          value === false ||
          value === "disable" ||
          value === "close"
        ) {
          return <div className="bg-red-500 rounded-full size-3" />;
        } else if (
          value === "active" ||
          value === "success" ||
          value === true ||
          value === "open"
        ) {
          return <div className="bg-green-500 rounded-full size-3" />;
        }
      }

      return value;
    },
    [columns]
  );

  const renderItem = useCallback(
    (item: any, index: number) => {
      const results = [];
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i] as any;
        results.push(
          <TableCell
            className={cn(
              "px-6 py-2 border",
              itemClassName,
              column?.className,
              column.type === "index" &&
                "sticky left-0 bg-secondary drop-shadow-lg"
            )}
            key={`${i}-${index}`}
          >
            {typeof column.renderColumn === "function"
              ? column.renderColumn(item)
              : renderItemDetail(column, item[column?.field || ""], index)}
          </TableCell>
        );
      }
      return <TableRow className="bg-white border">{results}</TableRow>;
    },
    [columns, itemClassName, renderItemDetail]
  );

  const renderBody = useMemo(() => {
    const results = [];
    for (let i = 0; i < data.length; i++) {
      results.push(<Fragment key={i}>{renderItem(data[i], i)}</Fragment>);
    }
    if (results.length <= 0) {
      if (typeof renderEmpty === "function") {
        results.push(renderEmpty());
      } else {
        results.push(
          <TableRow key={1}>
            <TableCell
              className="font-semibold px-6 py-4 text-center"
              colSpan={columns.length}
            >
              {emptyLabel}
            </TableCell>
          </TableRow>
        );
      }
    }
    return <TableBody>{results}</TableBody>;
  }, [columns, data]);

  return (
    <div>
      <div className={wrapperClass}>
        <Table className={cn("w-full text-left", className)}>
          {renderHeader}
          {renderBody}
        </Table>
      </div>
    </div>
  );
};

export default DataTable;

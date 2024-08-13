"use client";

import React, { useCallback } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { COLUMNS } from ".";
import { cn } from "@/lib/utils";
import { get } from "lodash";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { currencyFormat } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { formatCurrency } from "@/lib/currency";
import ImageLoader from "@/components/commons/ImageLoader";
import { TableCell, TableRow } from "@/components/ui/table";

interface Props {
  item: any;
  columns: COLUMNS[];
  itemClassName?: string;
  index: number;
  meta?: any;
}

export default function DraggableRow({
  item,
  columns,
  itemClassName,
  index,
  meta,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderItemDetail = useCallback(
    (column: COLUMNS, value: any, index: number) => {
      if (column.type === "datetime") {
        if (!value) return "---";
        const format = column.format || "YYYY-MM-DD HH:mm";
        return dayjs(value).format(format);
      }
      if (column.type === "date") {
        if (!value) return "---";
        const format = column.format || "YYYY-MM-DD";
        return dayjs(value).format(format);
      }
      if (column.type === "index") {
        const { perPage, currentPage } = meta;
        return index + 1 + currentPage * perPage;
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
        if (value === "inactive" || value === "fail" || value === false) {
          return (
            <div className="text-xs text-white bg-red-500 rounded-full capitalize text-center w-3 h-3" />
          );
        } else if (
          value === "active" ||
          value === "success" ||
          value === true
        ) {
          return (
            <div className="text-xs text-white bg-green-500 rounded-full capitalize text-center w-3 h-3" />
          );
        }
      }

      return value;
    },
    [columns, item]
  );

  const renderItem = useCallback(() => {
    const results = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i] as any;
      if (column.type === "index") {
        results.push(
          <TableCell
            {...attributes}
            {...listeners}
            className={cn(
              "w-20 sticky left-0 bg-secondary flex gap-2 items-center justify-start border",
              itemClassName,
              isDragging ? "cursor-grabbing" : "cursor-grab"
            )}
            key={`${i}-${index}`}
          >
            <GripVertical className="" />
            {typeof column.renderColumn === "function"
              ? column.renderColumn(item)
              : renderItemDetail(column, item[column?.field || ""], index)}
          </TableCell>
        );

        continue;
      }
      results.push(
        <TableCell
          className={clsx(
            "px-6 py-2 border",
            itemClassName,
            column?.className,
            column.type === "index" &&
              "sticky left-0 bg-secondary drop-shadow-lg"
          )}
        >
          {typeof column.renderColumn === "function"
            ? column.renderColumn(item)
            : renderItemDetail(column, item[column?.field || ""], index)}
        </TableCell>
      );
    }
    return results;
  }, [columns, itemClassName, renderItemDetail, item]);
  return (
    <TableRow ref={setNodeRef} style={style} className="ml-4">
      {renderItem()}
    </TableRow>
  );
}

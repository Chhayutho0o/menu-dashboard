"use client";

import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import DraggableRow from "@/components/dataTable/DraggableRow";
import {
  SortableContext,
  arrayMove,
  arraySwap,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { COLUMNS } from ".";
import { cn } from "@/lib/utils";

type Props = {
  columns: COLUMNS[];
  className?: string;
  data: any[];
  itemClassName?: string;
  renderEmpty?: () => React.ReactNode;
  emptyLabel?: string;
  wrapperClass?: string;
  actionSort: (item: any) => void;
  meta?: any;
};

const SortableTable: React.FC<Props> = ({
  columns,
  data = [],
  className,
  itemClassName,
  renderEmpty,
  emptyLabel = "There are no records",
  wrapperClass,
  actionSort,
  meta,
}) => {
  const [items, setItems] = useState<any[]>(data);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useMemo(() => setItems(data), [data]);

  const renderHeader = useMemo(() => {
    const results = [];
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      results.push(
        <TableHead
          className={clsx(
            "font-semibold border bg-secondary",
            column?.headerClass
          )}
          key={i}
        >
          <div className={clsx("px-2")}>
            {typeof column.renderLabel === "function"
              ? column.renderLabel()
              : column.label}
          </div>
        </TableHead>
      );
    }
    return (
      <TableHeader
        className={clsx(`text-xs text-gray-400 uppercase bg-white border`)}
      >
        <TableRow>{results}</TableRow>
      </TableHeader>
    );
  }, [columns]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((t: any) => t.id === active.id);
      const newIndex = items.findIndex((t: any) => t.id === over.id);
      const sorted = arraySwap(items, oldIndex, newIndex);
      setItems(sorted);
      actionSort(sorted.map((item) => item.id));
    }
  };
  if (renderEmpty && typeof renderEmpty === "function") {
    return renderEmpty();
  }
  if (renderEmpty) {
    return (
      <TableRow key={1}>
        <TableCell
          className="font-semibold text-center"
          colSpan={columns.length}
        >
          {emptyLabel}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <div>
      <div className={wrapperClass}>
        <Table className={cn("w-full text-left", className)}>
          {renderHeader}
          <TableBody>
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              autoScroll={false}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item: any, index: number) => (
                  <DraggableRow
                    key={item.id}
                    index={index}
                    item={item}
                    columns={columns}
                    itemClassName={itemClassName}
                    meta={meta}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SortableTable;

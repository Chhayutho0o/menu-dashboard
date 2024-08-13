"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@/types";
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
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arraySwap,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";
import Row from "./Row";

interface Props {
  data: Category[];
  actionSort: (_: any) => void;
}

export default function CategoryTable({ data, actionSort }: Props) {
  const t = useTranslations();
  const [items, setItems] = useState<any[]>(data);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useMemo(() => setItems(data), [data]);

  const renderHeader = useMemo(() => {
    return (
      <TableHeader
        className={clsx(`text-xs text-gray-400 uppercase bg-white border`)}
      >
        <TableRow>
          <TableHead
            className={
              "font-semibold border bg-secondary sticky left-0 drop-shadow-lg w-[70px]"
            }
          >
            {t("id")}
          </TableHead>
        </TableRow>
      </TableHeader>
    );
  }, []);

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

  return (
    <Table className={clsx("table-auto overflow-scroll w-full")}>
      {renderHeader}
      <TableBody>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          autoScroll={false}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item: any, index: number) => (
              <Row key={index} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </TableBody>
    </Table>
  );
}

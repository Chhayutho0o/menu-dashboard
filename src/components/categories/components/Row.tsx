"use client";

import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import ImageLoader from "@/components/commons/ImageLoader";
import { TableCell, TableRow } from "@/components/ui/table";
import { Category } from "@/types";

interface Props {
  item: Category;
  meta?: any;
}

export default function Row({ item }: Props) {
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

  const renderItem = useCallback(() => {
    return (
      <TableRow ref={setNodeRef} style={style} className="ml-4">
        <TableCell
          {...attributes}
          {...listeners}
          className={cn(
            "w-20 sticky left-0 bg-secondary flex gap-2 items-center justify-start border",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          <GripVertical className="" />
          {item.id}
        </TableCell>
        <TableCell className="px-6 py-2 border">
          <ImageLoader
            src={item.image}
            className="w-10 h-10"
            width={50}
            height={50}
          />
        </TableCell>
        <TableCell className="px-6 py-2 border">{item?.name.en}</TableCell>
        <TableCell className="px-6 py-2 border">{item?.name.km}</TableCell>
        <TableCell className="px-6 py-2 border">{item?.name.cn}</TableCell>
      </TableRow>
    );
  }, [item]);
  return (
    <TableRow ref={setNodeRef} style={style} className="ml-4">
      {renderItem()}
    </TableRow>
  );
}

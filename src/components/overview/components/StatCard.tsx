import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data: {
    [key: string]: string | number;
  };
}

export default function StatCard({ data }: Props) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 w-full">
      {Object.keys(data).map((key) => {
        const title = key.replace(/_/g, " ");
        return (
          <Card key={key} className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl">{data[key]}</CardTitle>
              <CardDescription className=" capitalize">{title}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}

import React from "react";
import { Link } from "@/hooks/navigation";
import { ExternalLink as Icon } from "lucide-react";

interface Props {
  href: string;
  title?: string;
  isExternal?: boolean;
}

export default function ExternalLink({ href, title, isExternal }: Props) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="flex gap-2 underline items-center"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {title}
      <Icon className="size-4" />
    </Link>
  );
}

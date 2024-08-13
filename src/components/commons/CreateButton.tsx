import React from "react";
import { Plus } from "lucide-react";
import { Link } from "@/hooks/navigation";
import { checkPrivilege } from "@/lib/utils";
import useSession from "@/components/session/useSession";
import { Button, ButtonProps } from "@/components/ui/button";

interface Props extends ButtonProps {
  href?: string;
  module?: string;
  actions?: () => void;
}

export default function CreateButton(props: Props) {
  const href = props.href || "#";
  const { session } = useSession();
  if (props.module) {
    if (!checkPrivilege(session, props.module)) {
      return null;
    }
  }

  if (props.href) {
    return (
      <Button {...props} className="rounded-full px-2" asChild>
        <Link prefetch={false} href={href}>
          <Plus className="size-6" />
        </Link>
      </Button>
    );
  }

  return (
    <Button onClick={props.actions} className="rounded-full px-2">
      <Plus className="size-6" />
    </Button>
  );
}

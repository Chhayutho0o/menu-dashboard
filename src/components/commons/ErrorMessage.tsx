import React from "react";
import { ErrorMessageProps } from "formik";
import { cn } from "@/lib/utils";
import { ErrorMessage as ErrorMessageForm } from "formik";

const ErrorMessage = ({ className, ...props }: ErrorMessageProps) => {
  return (
    <ErrorMessageForm
      {...props}
      render={(msg: string) =>
        typeof msg === "string" ? (
          <p
            className={cn("text-xs font-medium text-rose-500 mt-1", className)}
          >
            {msg}
          </p>
        ) : (
          Object.keys(msg).map((key) => (
            <p
              key={key}
              className={cn(
                "text-xs font-medium text-rose-500 mt-1",
                className
              )}
            >
              {msg[key]}
            </p>
          ))
        )
      }
    />
  );
};

export default ErrorMessage;

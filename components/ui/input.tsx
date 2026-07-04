import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-sm border border-input bg-white px-3 py-2 text-sm shadow-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

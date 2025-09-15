"use client";

import * as React from "react";
import { cva } from "class-variance-authority";

const textareaVariants = cva(
  "w-full rounded-md border border-neutral px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-primary focus:ring-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Textarea = React.forwardRef(({ className, variant, ...props }, ref) => {
  return <textarea className={textareaVariants({ variant, className })} ref={ref} {...props} />;
});

Textarea.displayName = "Textarea";

export { Textarea };

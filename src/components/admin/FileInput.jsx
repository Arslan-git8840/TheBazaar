'use client';
import React, { forwardRef, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";



export const FileInput = forwardRef(
  ({ className, onValueChange, onChange, ...props }, ref) => {
    const inputRef = useRef(null);

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click();
      }
    };

    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }

      if (onValueChange && e.target.files) {
        onValueChange(Array.from(e.target.files));
      }
    };

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="flex items-center gap-2"
          disabled={props.disabled}
        >
          <Upload className="h-4 w-4" />
          Select Images
        </Button>
        <input
          type="file"
          className="hidden"
          ref={(node) => {
            // Handle both the internal ref and the forwarded ref
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            inputRef.current = node;
          }}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
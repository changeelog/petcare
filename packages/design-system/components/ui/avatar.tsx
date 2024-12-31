"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";

// Avatar
function Avatar({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Root> & {
  ref?: React.Ref<HTMLSpanElement>;
}) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}
Avatar.displayName = AvatarPrimitive.Root.displayName;

// AvatarImage
function AvatarImage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Image> & {
  ref?: React.Ref<HTMLImageElement>;
}) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  );
}
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

// AvatarFallback
function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.Ref<HTMLSpanElement>;
}) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  );
}
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

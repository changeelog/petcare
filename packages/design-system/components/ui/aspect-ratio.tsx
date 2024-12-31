"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

function AspectRatio({
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AspectRatioPrimitive.Root> & {
  ref?: React.Ref<HTMLDivElement>;
}) {
  return <AspectRatioPrimitive.Root ref={ref} {...props} />;
}

export { AspectRatio };

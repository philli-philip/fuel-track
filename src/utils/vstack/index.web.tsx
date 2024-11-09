import React from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";

import { vstackStyle } from "./styles";

type IVStackProps = React.ComponentProps<"div"> &
  VariantProps<typeof vstackStyle>;

const VStack = React.forwardRef<React.ElementRef<"div">, IVStackProps>(
  ({ className, space, reversed, align, justify, ...props }, ref) => {
    return (
      <div
        className={vstackStyle({
          space,
          reversed,
          align,
          justify,
          class: className,
        })}
        {...props}
        ref={ref}
      />
    );
  }
);

VStack.displayName = "VStack";

export { VStack };

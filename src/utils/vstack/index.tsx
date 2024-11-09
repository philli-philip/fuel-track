import React from "react";
import type { VariantProps } from "@gluestack-ui/nativewind-utils";
import { View } from "react-native";

import { vstackStyle } from "./styles";

type IVStackProps = React.ComponentProps<typeof View> &
  VariantProps<typeof vstackStyle>;

const VStack = React.forwardRef<React.ElementRef<typeof View>, IVStackProps>(
  ({ className, space, reversed, align, justify, ...props }, ref) => {
    return (
      <View
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

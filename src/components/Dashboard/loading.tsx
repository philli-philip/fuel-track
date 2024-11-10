import { HStack } from "@/src/utils/hstack";
import { VStack } from "@/src/utils/vstack";
import React from "react";
import { View, ViewProps } from "react-native";

export const Loading = () => (
  <VStack className="dark:bg-neutral-950 bg-gray-100 flex-1 px-6 gap-12">
    <HStack space="2xl">
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-2/3 h-12" />
      </VStack>
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/4 h-4" />
        <Skeleton className="w-1/2 h-12" />
      </VStack>
    </HStack>
    <HStack space="2xl">
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-3/4 h-12" />
      </VStack>
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-2/3 h-12" />
      </VStack>
    </HStack>
    <HStack space="2xl">
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-2/3 h-12" />
      </VStack>
      <VStack space="sm" className="flex-1">
        <Skeleton className="w-1/3 h-4" />
        <Skeleton className="w-2/3 h-12" />
      </VStack>
    </HStack>
  </VStack>
);

type SkeletonType = ViewProps & { className?: string };

export const Skeleton = ({ className }: SkeletonType) => {
  return (
    <View
      className={`rounded-lg animate-pulse bg-gray-100 dark:bg-gray-800 ${className}`}
    />
  );
};

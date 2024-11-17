import React from "react";
import { View, ViewProps } from "react-native";

export const Loading = () => (
  <View className="dark:bg-neutral-950 flex-col bg-gray-100 flex-1 px-6 gap-12">
    <View className="flex-row gap-4">
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/3 h-4" key={"1-1"} />
        <Skeleton className="w-2/3 h-12" key={"1-2"} />
      </View>
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/4 h-4" key={"2-1"} />
        <Skeleton className="w-1/2 h-12" key={"2-2"} />
      </View>
    </View>
    <View className="flex-row gap-4">
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/3 h-4" key={"3-1"} />
        <Skeleton className="w-3/4 h-12" key={"3-2"} />
      </View>
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/3 h-4" key={"4-1"} />
        <Skeleton className="w-2/3 h-12" key={"4-2"} />
      </View>
    </View>
    <View className="flex-row gap-4">
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/2 h-4" key={"5-1"} />
        <Skeleton className="w-2/3 h-12" key={"5-2"} />
      </View>
      <View className="flex-1 flex-col gap-1">
        <Skeleton className="w-1/3 h-4" key={"6-1"} />
        <Skeleton className="w-2/3 h-12" key={"6-2"} />
      </View>
    </View>
  </View>
);

type SkeletonType = ViewProps & { className?: string };

export const Skeleton = ({ className }: SkeletonType) => {
  return (
    <View
      className={`rounded-lg animate-pulse bg-gray-100 dark:bg-gray-800 ${className}`}
    />
  );
};

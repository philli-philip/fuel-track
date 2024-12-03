import React from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "../skeleton/skeleton";

export const Loading = () => (
  <View style={style.container}>
    <View style={style.row}>
      <View style={style.group}>
        <Skeleton style={style.title} key={"1-1"} />
        <Skeleton style={style.value} key={"1-2"} />
      </View>
      <View style={style.group}>
        <Skeleton style={style.title} key={"2-1"} />
        <Skeleton style={style.value} key={"2-2"} />
      </View>
    </View>
    <View style={style.row}>
      <View style={style.group}>
        <Skeleton style={style.title} key={"3-1"} />
        <Skeleton style={style.value} key={"3-2"} />
      </View>
      <View style={style.group}>
        <Skeleton style={style.title} key={"4-1"} />
        <Skeleton style={style.value} key={"4-2"} />
      </View>
    </View>
    <View style={style.row}>
      <View style={style.group}>
        <Skeleton style={style.title} key={"5-1"} />
        <Skeleton style={style.value} key={"5-2"} />
      </View>
      <View style={style.group}>
        <Skeleton style={style.title} key={"6-1"} />
        <Skeleton style={style.value} key={"6-2"} />
      </View>
    </View>
  </View>
);

const style = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  group: {
    flex: 1,
    flexDirection: "column",
    gap: 32,
  },
  title: {
    height: 12,
    width: "40%",
  },
  value: {
    height: 40,
  },
  container: {
    flexDirection: "column",
    gap: 48,
    paddingBottom: 72,
  },
});

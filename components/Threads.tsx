import React from "react";
import { Thread } from "../types/threads";
import { View, useColorScheme, StyleSheet } from "react-native";
import { Text } from "./Themed";
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { timeAgo } from "../utils/TimeAgo";
import { Image } from "expo-image";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ThreadsItems(thread: Thread): JSX.Element {
  return (
    <View style={styles.container}>
      <PostLeft {...thread} />
      <View style={{ gap: 6, flexShrink: 1 }}>
        <PostHeading
          name={thread.author.name}
          createdAt={thread.createdAt}
          verified={thread.author.veriefied}
        />

        <BottomIcons />

        <Text>{thread.content}</Text>

        {thread.image && (
          <Image
            source={thread.image}
            style={{ width: "100%", height: 300, borderRadius: 10 }}
            contentFit="cover"
            placeholder={blurhash}
            transition={200}
          />
        )}

        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
      </View>
    </View>
  );
}

function PostLeft(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#0000020" : "#ffffff20";
  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.image}
        style={styles.img}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{ width: 20, alignItems: "center", alignSelf: "center", gap: 3 }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            //@ts-ignore
            source={thread.replies[index - 1]?.author.image}
            style={{ width: index * 9, height: index * 9, borderRadius: 15 }}
            contentFit="cover"
            placeholder={blurhash}
            transition={200}
          />
        ))}
      </View>
    </View>
  );
}

function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ fontWeight: "500" }}>{name}</Text>
        {verified && <MaterialIcons name="verified" size={14} color={"teal"} />}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "grey" }}>{timeAgo(createdAt)}</Text>
        {verified && (
          <Feather name="more-horizontal" size={14} color={"tomato"} />
        )}
      </View>
    </View>
  );
}

function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text>
      {replies} replies | {likes} likes
    </Text>
  );
}

function BottomIcons() {
  const iconSize = 20;
  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "dark" ? "white" : "black";
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor} />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 30,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

import React, { useContext, useRef } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../components/Themed";
import Lottie from "lottie-react-native";
import { createRandomUser } from "../../utils/DummyData";
import { ThreadsContext } from "../../context/threads-context";
import ThreadsItems from "../../components/Threads";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);

  const threads = useContext(ThreadsContext);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => {
              animationRef.current?.play();
            }}
          />
        }
      >
        <Lottie
          ref={animationRef}
          source={require("../../assets/dots.json")}
          autoPlay
          loop={false}
          style={{ width: 100, height: 100, alignSelf: "center" }}
        />

        {threads.map((thread) => (
          <ThreadsItems key={thread.id} {...thread} />
        ))}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

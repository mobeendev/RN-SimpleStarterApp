import React from "react";
import { WebView } from "react-native-webview";
import { View, Text, StyleSheet, Platform } from "react-native";

import ENV from "../env";

const WebAppScreen = (props) => {
  return (
    <WebView
      source={{ uri: "http://localhost:8888/oxfitnesslab/" }}
      style={{ marginTop: 20 }}
      startInLoadingState={true}
      originWhitelist={["*"]}
      onMessage={(event) => {
        // alert(event.nativeEvent.data);
        if (Platform.OS === "ios") {
          props.navigation.navigate("VideoScreenIos");
        } else {
          props.navigation.navigate("VideoScreenAndroid");
        }
      }}
    />
  );
};

export default WebAppScreen;

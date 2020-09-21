import React from "react";
import { WebView } from "react-native-webview";
import { View, Text, StyleSheet, Platform } from "react-native";

import ENV from "../env";

const WebAppScreen = (props) => {
  return (
    <WebView
      source={{ uri: "http://10.0.44.69/test/" }}
      style={{ marginTop: 20 }}
      startInLoadingState={true}
      originWhitelist={["*"]}
      onMessage={(event) => {
        if (event.nativeEvent.data) {
          alert(event.nativeEvent.data);
          props.navigation.navigate("VideoScreen", {
            itemId: 86,
            videoData: event.nativeEvent.data,
          });
        }
      }}
    />
  );
};

export default WebAppScreen;

import React from "react";
import { WebView } from "react-native-webview";
import ENV from "../env";

const WebAppScreen = (props) => {
  return (
    <WebView
      source={{ uri: "https://twitter.com" }}
      style={{ marginTop: 20 }}
    />
  );
};

export default WebAppScreen;

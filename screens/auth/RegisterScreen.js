import React from "react";
import { StyleSheet } from "react-native";
import WebViewScreen from "../WebViewScreen";
import { DefaultTheme, CommonStyle } from "../../utils/styles/common";
const WEBVIEW_REF = "WEBVIEW_REF";

export default class RegisterScreen extends WebViewScreen {
  static navigationOptions = {
    title: "Register Screen",
    header: null,
  };
  constructor(props) {
    super(props);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.backgroundColor,
  },
});

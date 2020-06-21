import React from "react";
import { WebView } from "react-native-webview";
import ENV from "../env";
import apiConfig from "../utils/network/config";
import { Alert, StyleSheet, Text, View } from "react-native";
import { UserStore } from "../utils/store/user";
import * as usersApi from "../utils/network/OflApi";
import Loading from "./Loading";

export default class MainScreen extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    token: "",
    url: "",
    isLoggedIn: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.state.token);
    UserStore.token()
      .then((response) => {
        this.setState({
          token: response,
          url: this.props.uri + "?user_token=" + response,
          isLoggedIn: true,
        });
      })
      .catch((e) => {
        console.error(e);
      });

    console.log(this.state.token);
  }

  renderContent = () => {
    switch (this.state.isLoggedIn) {
      case false:
        this.props.navigation.navigate("Login");
      case true:
        this.props.navigation.navigate("Dashboard");
      default:
        return <Loading />;
    }
  };

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});

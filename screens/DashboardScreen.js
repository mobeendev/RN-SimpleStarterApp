import React from "react";
import { WebView } from "react-native-webview";
import ENV from "../env";
import apiConfig from "../utils/network/config";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { UserStore } from "../utils/store/user";
import * as usersApi from "../utils/network/OflApi";
import Loading from "./Loading";
import InternetStatusContext from "../context/InternetStatusContext";
import InternetStatusScreenAlert from "../components/InternetStatusScreenAlert";

export default class DashboardScreen extends React.Component {
  static contextType = InternetStatusContext;

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      loading: "",
      message: "",
      token: false,
      url: null,
      refreshing: false,
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await UserStore.token();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.

    if (userToken != null && userToken.length != 0) {
      console.log(userToken);
      this.setState({
        token: userToken,
        loading: true,
        url: apiConfig.appUrl + "/en/?user_token=" + userToken,
      });

      console.log(this.state.url);
    } else {
      this.props.navigation.navigate("Home");
    }
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  renderContent = () => {
    switch (this.state.loading) {
      case false:
        return (
          <View>
            <Text>working...</Text>
          </View>
        );
      case true:
        if (this.context.internet === "true!") {
          // if (false) {
          return (
            <WebView
              source={{ uri: this.state.url }}
              style={{ marginTop: 0 }}
              startInLoadingState={true}
            />
          );
        } else {
          return <InternetStatusScreenAlert />;
        }
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
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    alignSelf: "center",
  },
  offlineText: {
    color: "red",
  },
});

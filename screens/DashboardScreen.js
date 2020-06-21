import React from "react";
import { WebView } from "react-native-webview";
import ENV from "../env";
import apiConfig from "../utils/network/config";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { UserStore } from "../utils/store/user";
import * as usersApi from "../utils/network/OflApi";
import Loading from "./Loading";
import InternetStatusContext from "../context/InternetStatusContext";

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
        if (this.context.internet === "true") {
          // if (false) {
          return (
            <WebView
              source={{ uri: this.state.url }}
              style={{ marginTop: 0 }}
              startInLoadingState={true}
            />
          );
        } else {
          return (
            <View style={styles.textContainer}>
              <Image
                style={{
                  height: "85%",
                  width: "75%",
                  resizeMode: "contain",
                  // borderColor: "red",
                  // borderWidth: 3,
                }}
                source={require("../utils/common/img/logo_app.png")}
              />
              <Text
                style={{
                  alignSelf: "center",
                  color: "red",
                  fontSize: 14,
                  fontWeight: "bold",
                  marginTop: Platform.OS === "ios" ? 1 : 5,
                }}
              >
                No internet. Please check your connection and try again
              </Text>
              {/* <Button onPress={this.refreshScreen} title="Refresh Screen" /> */}
            </View>
          );
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

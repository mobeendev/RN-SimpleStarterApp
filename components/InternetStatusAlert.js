import React, { PureComponent } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import InternetStatusContext from "../context/InternetStatusContext";

const { width } = Dimensions.get("window");

class InternetStatusAlert extends PureComponent {
  static contextType = InternetStatusContext;

  state = {
    isConnected: false,
  };

  componentDidMount() {
    this.handleConnectivityChange();
  }

  componentDidUpdate(prevProps) {
    if (this.state.isConnected !== prevProps.isConnected) {
      this.handleConnectivityChange();
    }
  }

  handleConnectivityChange = () => {
    this.setState({
      isConnected: this.context.internet === "true" ? true : false,
    });
  };

  render() {
    if (this.state.isConnected !== true) {
      return <NoticeScreen />;
    }
    return null;
  }
}

function NoticeScreen() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>
        No internet. Please check your connection and try again
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width,
    position: "absolute",
    top: Platform.OS === "ios" ? 35 : 2,
  },
  offlineText: { color: "#fff" },
});

export default InternetStatusAlert;

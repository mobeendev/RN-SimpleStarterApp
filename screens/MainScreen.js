import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
export default class HomeScreen extends Component<{}> {
  constructor() {
    super();

    this.state = { orientation: "", data: {} };
  }

  getOrientation = () => {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.setState({ orientation: "portrait" });
      } else {
        this.setState({ orientation: "landscape" });
        // ScreenOrientation.unlockAsync();
      }
    }
  };

  async componentDidMount() {
    console.log("started...", this.state.orientation);
    this.getOrientation();

    // ScreenOrientation.getOrientationAsync().then(data => this.setState({data}));
    if (Platform.OS === "ios" && this.state.orientation == "landscape") {
      await ScreenOrientation.unlockAsync();

      console.log("unlocket...");

      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    if (Platform.OS !== "ios") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    Dimensions.addEventListener("change", () => {
      this.getOrientation();
    });
  }
  render() {
    return (
      <View
        ref="rootView"
        style={[
          styles.container,
          {
            backgroundColor:
              this.state.orientation == "portrait" ? "#1B5E20" : "#006064",
          },
        ]}
      >
        <Text style={styles.text}>
          {this.state.orientation.toUpperCase()} VIEW
        </Text>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.btnInput}>
            <Button
              style={styles.btnInput}
              title="Go to OxWebSite"
              onPress={() => this.props.navigation.navigate("WebApp")}
            />
          </View>
          <View style={styles.btnInput}>
            <Button
              style={styles.btnInput}
              title="Test Video"
              onPress={() => this.props.navigation.navigate("VideoScreen")}
            />
          </View>
          <View style={styles.btnInput}>
            <Button
              style={styles.btnInput}
              title="Switch Video"
              onPress={() =>
                this.props.navigation.navigate("VideoScreenSwitch")
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
  },
  container: {
    flex: 1,
    paddingVertical: 4,
  },
});

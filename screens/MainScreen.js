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
import { DeviceMotion } from "expo-sensors";
import Constants from "expo-constants";
export default class HomeScreen extends Component<{}> {
  render() {
    return (
      <View ref="rootView" style={[styles.container]}>
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

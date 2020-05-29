import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class SimpleClassCompScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> A Simple Class Component </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

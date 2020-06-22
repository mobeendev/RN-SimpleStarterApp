import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";

const InternetStatusScreenAlert = () => {
  return (
    <View style={styles.textContainer}>
      <ImageBackground
        style={styles.theImage}
        source={require("../utils/common/img/logo_app.png")}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
          }}
        >
          <Text style={styles.noticeText}>
            No internet. Please check your connection and try again!
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InternetStatusScreenAlert;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0,
    borderColor: "black",
    borderWidth: 3,
  },
  noticeText: {
    color: "#000",
    textAlign: "center",
    marginTop: Platform.OS === "ios" ? 560 : 420,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 13 : 14,
    fontWeight: "bold",
    // marginTop: Platform.OS === "ios" ? 1 : 5,
  },
  theImage: {
    height: "80%",
    width: Platform.OS === "ios" ? "98%" : "100%",
    resizeMode: "center",
    // borderColor: "red",
    // borderWidth: 3,
  },
});

import React from "react";
import { StyleSheet, View, Text, ImageBackground, Image } from "react-native";

const InternetStatusScreenAlert = () => {
  return (
    <View style={styles.textContainer}>
      <Image
        style={styles.theImage}
        source={require("../utils/common/img/logo_app.png")}
      />
      <View
        style={{
          backgroundColor: "transparent",
        }}
      >
        <Text style={styles.noticeText}>
          No internet. Please check your connection and try again!
        </Text>
      </View>
    </View>
  );
};

export default InternetStatusScreenAlert;

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 0,
    borderColor: "black",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  noticeText: {
    color: "#000",
    textAlign: "center",
    // marginTop: Platform.OS === "ios" ? 10 : 5,
    alignSelf: "center",
    fontSize: Platform.OS === "ios" ? 14 : 14,
    fontWeight: "bold",
    // marginTop: Platform.OS === "ios" ? 1 : 5,
  },
  theImage: {
    height: "50%",
    width: "75%",
    resizeMode: "contain",
    // borderColor: "red",
    // borderWidth: 3,
    marginTop: Platform.OS === "ios" ? -110 : -95,
  },
});

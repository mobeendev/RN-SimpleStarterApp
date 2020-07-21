import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { AntDesign } from "@expo/vector-icons";
export default class VideoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  async componentDidMount() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }
  async componentWillUnmount() {
    await ScreenOrientation.unlockAsync();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          source={{
            uri:
              "https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&profile_id=175",
          }}
          rate={1.0}
          volume={1.0}
          orientation="landscape"
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay
          isLooping
          style={{
            height: "100%",
            width: "100%",
            // borderColor: "gray",
            // borderWidth: 1,
          }}
          useNativeControls={true}
        />
        <View
          style={[
            styles.ad_badge,
            {
              height: "50%",
              position: "absolute",
              right: Platform.OS === "ios" ? "5%" : "1%",
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              // backgroundColor: "blue",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                alignSelf: "stretch",
              }}
            >
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={async () => {
                  await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT_UP
                  );
                  this.props.navigation.navigate("Main");
                }}
              >
                <AntDesign name="closecircle" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // backgroundColor: "orange",
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="red" />
                <Text style={styles.ad_badge_text}> 22.51 </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="clockcircleo" size={24} color="orange" />
                <Text style={styles.ad_badge_text}> 22.51 </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="piechart" size={24} color="blue" />

                <Text style={styles.ad_badge_text}> 22.51 </Text>
              </View>
            </View>
          </View>
        </View>
        <StatusBar hidden />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderColor: "gray",
    borderWidth: 1,
  },
  ad_badge: {
    // borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 90,
  },
  ad_badge_text: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#000000",
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

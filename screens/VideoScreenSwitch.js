import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Video } from "expo-av";
// import Video from 'react-native-video';
import * as ScreenOrientation from "expo-screen-orientation";

export default class VideoScreenSwitch extends React.Component {
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
      <View style={styles.container}>
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
            width: "90%",
            borderColor: "gray",
            borderWidth: 1,
          }}
          useNativeControls={true}
          // onReadyForDisplay={params => {
          //   params.naturalSize.orientation = "landscape";
          //   console.log("params---->", params.naturalSize.orientation);
          // }}
        />
        <View style={styles.ad_badge}>
          <View style={{ flexDirection: "row", height: 300 }}>
            <View
              style={{
                backgroundColor: "red",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => this.props.navigation.navigate("App")}
              >
                <Text style={styles.appButtonText}>Go Back Switch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={() => this.props.navigation.pop()}
              >
                <Text style={styles.appButtonText}>Go Back by Pop</Text>
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: "center",
                  // transform: [{ rotate: "-90deg" }],
                }}
              >
                Here is some informatio for you lkjljlkj
              </Text>
            </View>
          </View>
        </View>
      </View>
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
    width: "10%",
  },
  ad_badge_text: {
    color: "red",
    textAlign: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#000000",
    paddingVertical: 10,
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

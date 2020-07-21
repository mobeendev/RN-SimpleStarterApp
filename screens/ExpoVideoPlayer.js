import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";

import * as ScreenOrientation from "expo-screen-orientation";

export default class ExpoVideoPlayer extends React.Component {
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
        <VideoPlayer
          style={{
            height: "100%",
            width: "90%",
            borderColor: "gray",
            borderWidth: 1,
          }}
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri:
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
          }}
          isPortrait={true}
          inFullscreen={false}
          switchToLandscape={async () =>
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
            )
          }
          inFullscreen={true}
          fullscreenExitIcon={() => <Button title="Exit" />}
          fullscreenEnterIcon={() => <Button title="Enter" />}
          switchToPortrait={async () =>
            await ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.DEFAULT
            )
          }
          showControlsOnLoad={true}
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
                onPress={() => this.props.navigation.navigate("Main")}
              >
                <Text style={styles.appButtonText}>Go Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={async () => {
                  await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT_UP
                  );
                  this.props.navigation.navigate("Main");
                }}
              >
                <Text style={styles.appButtonText}>Back</Text>
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

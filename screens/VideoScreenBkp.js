import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { Video } from "expo-av";
// import Video from 'react-native-video';
import * as ScreenOrientation from "expo-screen-orientation";

export default function VideoScreenBkp() {
  const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
      console.log(this._video.naturalSize);
    } catch (error) {
      console.log(error.toString());
    }
  };

  // _onFullscreenUpdate = (event) => {
  //   console.log(
  //     `FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`
  //   );
  // };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <Video
        source={{
          uri:
            "https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&profile_id=175",
        }}
        rate={1.0}
        ref={(ref) => {
          this._video = ref;
        }}
        onFullscreenUpdate={async () => {
          await ScreenOrientation.lockAsync(
            orientationIsLandscape
              ? ScreenOrientation.OrientationLock.PORTRAIT
              : ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
          );
          setOrientationIsLandscape(!orientationIsLandscape);
        }}
        volume={1.0}
        orientation="landscape"
        isMuted={false}
        resizeMode={Video.RESIZE_MODE_CONTAIN}
        shouldPlay
        isLooping
        style={{
          height: "80%",
          width: "80%",
        }}
        useNativeControls={true}
        // onReadyForDisplay={params => {
        //   params.naturalSize.orientation = "landscape";
        //   console.log("params---->", params.naturalSize.orientation);
        // }}
      />

      <TouchableHighlight onPress={this._onFullscreenPressed}>
        <View style={styles.button}>
          <Text>Fullscreen</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

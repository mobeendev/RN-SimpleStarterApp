import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Button,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
var { height, width } = Dimensions.get("window");

export default class VideoScreenAndroid extends React.Component {
  state = {
    mute: false,
    fullScreen: false,
    shouldPlay: true,
    orientationIsLandscape: false,
  };

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay,
    }));
  };

  handleVolume = () => {
    this.setState((prevState) => ({
      mute: !prevState.mute,
    }));
  };

  static navigationOptions = {
    //header: null,
    headerTitle: "",
    headerTransparent: false,
    headerTintColor: "white",
  };

  constructor() {
    console.log("constructor");
    super();
    this.state = {
      layout: {
        height: height,
        width: width,
      },
    };
  }
  //
  onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      this.props.navigation.goBack();
    }
  };
  //

  _handleVideoRef = async (component) => {
    const playbackObject = component;
    if (playbackObject) {
      await playbackObject.loadAsync({
        uri:
          "https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&profile_id=175",
        shouldPlay: false,
        posterSource: this.poster,
      });
      // todo: Trigger fullScreen without videoStack loading
      //playbackObject.presentFullscreenPlayer();
      playbackObject.playAsync();
      //playbackObject.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    }
  };

  componentDidMount() {}

  componentWillUnmount() {
    //playbackObject.dismissFullscreenPlayer();
    //this.props.navigation.goBack();
  }

  onFullscreenUpdate = ({ fullscreenUpdate, status }) => {
    console.log(fullscreenUpdate, status);
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT:
        console.log(" the fullscreen player is about to present");
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        console.log("the fullscreen player just finished presenting");
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        console.log("the fullscreen player is about to dismiss");
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS:
        console.log("the fullscreen player just finished dismissing");
    }
  };

  _onLayout = (event) => {
    console.log(
      "------------------------------------------------" +
        JSON.stringify(event.nativeEvent.layout)
    );

    this.setState({
      layout: {
        height: event.nativeEvent.layout.height,
        width: event.nativeEvent.layout.width,
      },
    });
  };

  render() {
    const { width } = Dimensions.get("window");
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <View style={styles.ad_badge}>
          <Text style={styles.ad_badge_text}> Android Video Screen </Text>
        </View>

        <Video
          ref={this._handleVideoRef}
          useNativeControls
          source={{
            uri:
              "https://player.vimeo.com/external/412136588.hd.mp4?s=7097bb39bf032d4dbbc5626aa3a3a3b2a83229a3&profile_id=175",
          }}
          rate={1.0}
          resizeMode="contain"
          onPlaybackStatusUpdate={(playbackStatus) =>
            this.onPlaybackStatusUpdate(playbackStatus)
          }
          onReadyForDisplay={(params) => {
            params.naturalSize.orientation = "landscape";
            console.log("params---->", params.naturalSize.orientation);
          }}
          onFullscreenUpdate={async () => {
            if (this.state.orientationIsLandscape) {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
              );
            } else {
              await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT
              );
            }

            this.setState((prevState) => ({
              orientationIsLandscape: !prevState.orientationIsLandscape,
            }));
          }}
          isMuted={true}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay={false}
          isLooping
          style={{
            flex: 1,
            height: "80%",
            width: "100%",
            borderWidth: 3,
            borderColor: "green",
          }}
          useNativeControls={true}
        />
        <Button
          style={styles.btnInput}
          title="Back to your Account"
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
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
  ad_badge: {
    position: "absolute",
    top: 100,
    left: 0,
    zIndex: 1000, // works on ios
    elevation: 3,
  },
  ad_badge_text: {
    color: "red",
    textAlign: "center",
  },
});

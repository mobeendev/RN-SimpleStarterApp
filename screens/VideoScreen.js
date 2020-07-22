import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { AntDesign } from "@expo/vector-icons";
export default class VideoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = { hovered: false, orientation: "" };
  }
  async componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener("change", () => {
      this.getOrientation();
    });
    //   await ScreenOrientation.lockAsync(
    //     ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    //   );
  }
  async componentWillUnmount() {
    await ScreenOrientation.unlockAsync();
  }
  getOrientation = () => {
    if (this.refs.rootView) {
      if (Dimensions.get("window").width < Dimensions.get("window").height) {
        this.setState({ orientation: "portrait" });
      } else {
        this.setState({ orientation: "landscape" });
      }
    }
  };
  render() {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {
            flexDirection:
              this.state.orientation == "portrait" ? "column" : "row",
          },
        ]}
        ref="rootView"
      >
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
          style={
            this.state.orientation == "portrait"
              ? styles.ad_badge_portrait
              : styles.ad_badge_landscape
          }
        >
          <View
            style={
              this.state.orientation == "portrait"
                ? styles.info_bar_protrait
                : styles.info_bar_landscape
            }
          >
            <View>
              <TouchableOpacity
                style={styles.appButtonContainer}
                onPress={async () => {
                  await ScreenOrientation.lockAsync(
                    ScreenOrientation.OrientationLock.PORTRAIT_UP
                  );
                  this.props.navigation.navigate("Main");
                }}
              >
                <AntDesign
                  style={{}}
                  name="closecircle"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View
              style={
                this.state.orientation == "portrait"
                  ? styles.info_bar_items_portrait
                  : styles.info_bar_items_landscape
              }
            >
              {/* <Text style={{ color: "red" }}>
                {this.state.orientation.toUpperCase()}
              </Text> */}
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign style={{}} name="heart" size={24} color="red" />
                <Text style={styles.ad_badge_text}> 22.51 </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="clockcircleo" size={24} color="orange" />
                <Text style={styles.ad_badge_text}> 65.01 </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <AntDesign name="piechart" size={24} color="blue" />

                <Text style={styles.ad_badge_text}> 17.38 </Text>
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
  ad_badge_landscape: {
    // borderColor: "gray",
    // borderWidth: 1,
    // borderRadius: 90,

    height: "50%",
    position: "absolute",
    right: Platform.OS === "ios" ? "5%" : "1%",
  },
  ad_badge_portrait: {
    // borderColor: "gray",
    // borderWidth: 1,
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: Platform.OS === "ios" ? "10%" : "1%",
  },

  info_bar_protrait: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  info_bar_landscape: {
    flex: 1,
    // backgroundColor: "blue",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  info_bar_items_landscape: {
    // backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "space-evenly",

    flexDirection: "column",
  },

  info_bar_items_portrait: {
    // backgroundColor: "orange",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    flexDirection: "row",
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

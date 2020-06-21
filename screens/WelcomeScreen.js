import React from "react";
import {
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  View,
  Alert,
} from "react-native";
import { DefaultTheme, CommonStyle } from "../utils/styles/common";
import { OFLButton } from "../utils/common/OFLButton";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import InternetStatusAlert from "../components/InternetStatusAlert";

export default class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: false,
    };
  }

  async componentDidMount() {
    // await this.checkMultiPermissions();
    await this.checkMultiPermissions();
  }

  checkMultiPermissions = async () => {
    const permission_location = await Permissions.askAsync(
      Permissions.LOCATION
    );
    // console.log(permission_location);
    const permission_audio = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    // console.log(permission_audio);

    const permission_cam = await Camera.requestPermissionsAsync();

    // console.log(permission_cam);

    if (
      permission_location.status !== "granted" ||
      permission_audio.status !== "granted" ||
      permission_location.status !== "granted"
    ) {
      Alert.alert("Hey! You have not enabled the required permissions");
    }
  };

  showCameraPermissionDeniedAlert = () => {
    Alert.alert(
      "Warning!",
      "You have not allowed camera access!",
      [
        {
          text: "Okay",
          onPress: () => console.log("No button clicked"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/56910131_2406230036272574_8720647575146856448_o.jpg?_nc_cat=110&_nc_sid=e3f864&_nc_ohc=kkH7LM6ZYuUAX-dd27Y&_nc_ht=scontent-cdt1-1.xx&oh=c74d0e2d0d5259fe8ad92d063737b314&oe=5F04BC49",
        }}
        style={styles.container}
      >
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 1)"
          barStyle="light-content"
        />
        <InternetStatusAlert />
        <View style={styles.header}>
          <Image
            source={require("../utils/common/img/icn_home.png")}
            style={styles.logo}
          />
          <Text style={styles.headline}>Welcome to OxFitness Lab</Text>
        </View>

        <View style={styles.actions}>
          <OFLButton
            size={40}
            style={[styles.button, styles.buttonCta]}
            text="Get Started"
            color="#ffffff"
            onPress={this._signIn.bind(this)}
          />
          <OFLButton
            size={40}
            style={[styles.button]}
            text="Register"
            color="#ffffff"
            onPress={this._register.bind(this)}
          />
        </View>
      </ImageBackground>
    );
  }

  _signIn = async () => {
    this.props.navigation.navigate("SignIn");
  };

  _register = async () => {
    this.props.navigation.navigate("Register");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: DefaultTheme.backgroundColor,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  headline: {
    color: DefaultTheme.textPrimaryInverseColor,
    fontSize: 28,
    fontWeight: "400",
    paddingTop: 10,
    paddingBottom: 10,
    paddingStart: 5,
    paddingEnd: 5,
    textAlign: "center",
    fontFamily: DefaultTheme.fontContent,
    marginBottom: 50,
  },

  logo: {
    marginTop: "25%",
    width: 75,
    height: 75,
    marginBottom: 20,
  },

  actions: {
    height: "20%",
    width: "100%",
    alignItems: "center",
  },

  button: {
    color: "#ffffff",
    height: 40,
    width: "80%",
  },

  buttonCta: {
    backgroundColor: "#001BA2",
  },
});

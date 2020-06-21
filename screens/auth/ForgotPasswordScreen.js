import React from "react";
import {
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

import { DefaultTheme } from "../../utils/styles/common";
import { UserStore } from "../../utils/store/user";
import * as usersApi from "../../utils/network/OflApi";
import { OFLButton } from "../../utils/common/OFLButton";
import InternetStatusAlert from "../../components/InternetStatusAlert";

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: "Forgot Password",
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      refreshing: false,
    };
  }

  onLogin(form) {
    this.setState({
      refreshing: true,
    });

    const { username } = this.state;

    usersApi
      .resetPassword({
        username: username,
      })
      .then((response) => {
        this._handleResponse(response);
      })
      .catch((error) => {
        this._handleError(0, "Network error");
        console.error(error);
      });
  }

  _handleResponse = (response) => {
    this.setState({
      refreshing: false,
    });

    if (
      response != null &&
      response.hasOwnProperty("success") &&
      response.success == true
    ) {
      this._success();
    } else {
      this._handleError(response.message);
    }
  };

  _success = () => {
    this.setState({
      refreshing: false,
    });

    UserStore.clear();

    Alert.alert(
      "Success",
      "An email was sent with instructions to reset your password",
      [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate("AuthLoading", {});
          },
        },
      ],
      { cancelable: false }
    );
  };

  _handleError = (error) => {
    this.setState({
      refreshing: false,
    });

    Alert.alert("Error", error, [{ text: "OK", onPress: () => {} }], {
      cancelable: false,
    });
  };

  _back() {
    this.props.navigation.pop();
  }

  render() {
    return (
      <ImageBackground
        source={require("../../utils/common/img/background1.png")}
        style={styles.container}
      >
        <TouchableOpacity
          style={styles.backbutton}
          onPress={this._back.bind(this)}
        >
          <Image
            source={require("../../utils/common/img/icn_back_white.png")}
            style={styles.container}
          />
        </TouchableOpacity>
        <InternetStatusAlert />
        <View style={styles.form}>
          {this.state.refreshing && (
            <ActivityIndicator style={styles.loading} size="large" />
          )}

          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={"Your email address"}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#E8E8E8"
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={this.onLogin.bind(this)}
          />

          <OFLButton
            size={50}
            style={[styles.button, styles.textButton]}
            text="Reset Password"
            color="#ffffff"
            onPress={this.onLogin.bind(this)}
          />
        </View>
      </ImageBackground>
    );
  }

  _forgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  backbutton: {
    position: "absolute",
    left: 0,
    top: 0,
    padding: 10,
    marginTop: 25,
    height: 50,
    width: 50,
    backgroundColor: "transparent",
  },

  backbuttonIcon: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },

  form: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: "80%",
    height: "25%",
  },

  input: {
    width: "100%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    color: "white",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: DefaultTheme.fontContent,
  },

  loading: {
    marginTop: 25,
    width: 50,
    height: 50,
    zIndex: 2,
  },

  button: {
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
    width: "100%",
  },

  textButton: {
    backgroundColor: "#001BA2",
    color: "white",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

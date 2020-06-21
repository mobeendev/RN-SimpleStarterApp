import React from "react";
import {
  View,
  ImageBackground,
  Button,
  ScrollView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { DefaultTheme, CommonStyle } from "../../utils/styles/common";
import { UserStore } from "../../utils/store/user";
import * as usersApi from "../../utils/network/OflApi";
import { OFLButton } from "../../utils/common/OFLButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InternetStatusAlert from "../../components/InternetStatusAlert";

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: "Please sign in",
  };

  constructor(props) {
    super(props);

    this.state = {
      // username: "",
      // password: "",
      username: "omar@oxfitnesslab.com",
      password: "Sport01.",
      refreshing: false,
    };

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }

  onLogin(form) {
    this.setState({
      refreshing: true,
    });

    const { username, password } = this.state;

    usersApi
      .login({ username, password })
      .then((response) => {
        this._handleLoginResponse(response);
      })
      .catch((error) => {
        if (error.response && error.response.json) {
          error.response.json().then((json) => {
            this._handleError(json.code, json.message);
          });
        } else {
          this._handleError(error.code, error.message);
        }
      });
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  _handleLoginResponse = (response) => {
    this.setState({
      refreshing: false,
    });

    if (response == null) {
      this._handleError(0, "Network Error");
    } else if (response.hasOwnProperty("success")) {
      this._success(response.user);
    } else {
      this._handleError(response.code, response.message);
    }
  };

  _success = (user) => {
    UserStore.save(user).then((response) => {
      this.props.navigation.navigate("App", { user: user });
    });
  };

  _handleError = (code, error) => {
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

  _forgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: "#161616" }}
        extraHeight={15}
        extraScrollHeight={15}
      >
        <ImageBackground
          source={{
            uri:
              "https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/56910131_2406230036272574_8720647575146856448_o.jpg?_nc_cat=110&_nc_sid=e3f864&_nc_ohc=kkH7LM6ZYuUAX-dd27Y&_nc_ht=scontent-cdt1-1.xx&oh=c74d0e2d0d5259fe8ad92d063737b314&oe=5F04BC49",
          }}
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
            <TextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder="Email address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="#E8E8E8"
              style={styles.input}
              editable={!this.state.refreshing}
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              ref={(input) => {
                this.inputs["username"] = input;
              }}
              onSubmitEditing={() => {
                this.focusNextField("password");
              }}
            />
            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#E8E8E8"
              style={styles.input}
              editable={!this.state.refreshing}
              returnKeyType="send"
              onSubmitEditing={this.onLogin.bind(this)}
              ref={(input) => {
                this.inputs["password"] = input;
              }}
            />

            {!this.state.refreshing && (
              <OFLButton
                size={50}
                style={[styles.button, styles.textButton]}
                text="Sign In"
                color="#ffffff"
                disabled={!this.state.username || !this.state.password}
                onPress={this.onLogin.bind(this)}
              />
            )}

            {this.state.refreshing && (
              <ActivityIndicator
                style={styles.loading}
                color="white"
                size="large"
              />
            )}

            <OFLButton
              size={40}
              style={[styles.button, styles.forgotPasswordButton]}
              text="Forgot Password"
              color="#ffffff"
              onPress={this._forgotPassword.bind(this)}
            />
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
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
    backgroundColor: "red",
  },

  scroll: {
    marginTop: 50,
    width: "100%",
    paddingLeft: 30,
    flexDirection: "column",
  },

  form: {
    flex: 1,
    alignItems: "center",
    width: "90%",
    marginTop: "100%",
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

  button: {
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
    height: 50,
  },

  textButton: {
    backgroundColor: "#001BA2",
    color: "white",
    width: "100%",
    justifyContent: "center",
  },

  loading: {
    marginTop: 25,
    width: 50,
    height: 50,
    zIndex: 2,
  },

  forgotPasswordButton: {
    color: "#ffffff",
    padding: 0,
    height: 40,
    width: "80%",
    fontWeight: "400",
  },
});

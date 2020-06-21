import React, { Component } from "react";
import { StyleSheet, Alert, Text, Button } from "react-native";
import {
  View,
  StatusBar,
  ActivityIndicator,
  Platform,
  BackHandler,
  Image,
} from "react-native";
import { DefaultTheme } from ".././utils/styles/common";
import {
  withNavigation,
  NavigationActions,
  DrawerActions,
} from "react-navigation";
import { UserStore, userToken, user } from "./../utils/store/user";
import Communications from "react-native-communications";
import ImagePicker from "react-native-image-crop-picker";
import * as usersApi from "./../utils/network/OflApi";
import apiConfig from "../utils/network/config";
const WEBVIEW_REF = "WEBVIEW_REF";
import { WebView } from "react-native-webview";
import InternetStatusContext from "../context/InternetStatusContext";
import InternetStatusAlert from "../components/InternetStatusAlert";

class WebViewScreen extends React.Component {
  static contextType = InternetStatusContext;

  props: {
    style?: any,
    name?: string,
    url: string,
    icon: any,
    statusBarBackground: any,
    statusBarStyle: string,
  };

  static navigationOptions = {
    title: "Webview",
  };

  constructor(props) {
    super(props);
    // this.setState({
    //   refreshing: true
    //  });

    this.state = {
      visible: true,
      loading: false,
      refreshing: false,
      token: "",
      url: "",
      previousUrl: "",
      canGoBack: false,
      fromNotification: false,
      lastRefresh: Date(Date.now()).toString(),
    };

    this.refreshScreen = this.refreshScreen.bind(this);
  }

  openDrawer() {
    const setParamsAction = NavigationActions.setParams({
      refresh: true,
    });
    this.props.navigation.dispatch(setParamsAction);
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }

  refreshScreen() {
    console.log(this.context.internet);

    this.setState({ lastRefresh: Date(Date.now()).toString() });
  }
  onWebviewMessage(event) {
    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
      this.refs[WEBVIEW_REF].postMessage(event.nativeEvent.data);
    } catch (err) {
      return;
    }

    switch (msgData.targetFunc) {
      case "show_menu":
        this.openDrawer();
        break;

      case "back":
        this.props.navigation.pop();
        break;

      case "root":
        this.setState({
          canGoBack: false,
        });
        break;

      case "register_success":
        this.props.navigation.pop();
        break;

      case "add_credit_card":
        // we deactivate onMessage function to fix a react native bug
        // https://github.com/facebook/react-native/pull/18546
        var url = apiConfig.url + msgData.data.url;
        this.props.navigation.navigate("AddCard", {
          url: url,
          onAddCard: this.onAddCard,
        });

        break;

      case "telephone":
        var phoneNumber = msgData.number;
        Communications.phonecall(phoneNumber, false);
        break;

      case "profile_picture_camera":
        ImagePicker.openCamera({
          width: 300,
          height: 300,
          cropping: true,
        }).then((picture) => {
          this.setState({
            refreshing: true,
          });

          usersApi
            .uploadProfilePicture(user.id, userToken, picture)
            .then((response) => {
              if (response.ok) {
                this.setState({
                  token: this.props.token,
                  refreshing: false,
                  url: this.props.uri + "?user_token=" + this.props.token,
                });

                return response;
              } else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
              }
              // TODO: reload webview
            })
            .catch((err) => {
              console.error(err);
            });
        });
        break;

      case "profile_picture_gallery":
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then((picture) => {
          this.setState({
            refreshing: true,
            url:
              this.props.uri +
              "?user_token=" +
              this.props.token +
              "&reload_picture=true",
          });

          usersApi
            .uploadProfilePicture(user.id, userToken, picture)
            .then((response) => {
              if (response.ok) {
                this._refreshViews();

                return response;
              } else {
                console.error(response);
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
              }
              // TODO: reload webview
            })
            .catch((err) => {
              console.error(err);
            });
        });
        break;
    }

    // trigger success callback
    msgData.isSuccessfull = true;
    msgData.args = [{ success: true }];
    this.refs[WEBVIEW_REF].postMessage(JSON.stringify(msgData));
  }

  _refreshViews() {
    setTimeout(() => {
      this.setState({
        token: this.props.token,
        refreshing: false,
        url: this.props.uri + "?user_token=" + this.props.token,
      });
    }, 1000);

    this._refreshUser();
  }

  onAddCard = (data) => {
    this.refs[WEBVIEW_REF].postMessage("card_added");
  };

  _refreshUser() {
    usersApi
      .user(user.id)
      .then((response) => {
        UserStore.save(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onAndroidBackPress = () => {
    if (this.state.canGoBack && this.refs[WEBVIEW_REF]) {
      this.refs[WEBVIEW_REF].postMessage("go_back");
      return true;
    }
    return false;
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }

    // this.notificationOpenedListener();
    // this.messageListener();
  }

  componentDidMount() {
    /*
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;

      this.props.navigation.navigate('Notifications')
      
    });
   */
    /*
    this.messageListener = firebase.notifications().onNotification((message) => {
      var title = message.title;
      if(!title)
        title = 'Notification';

      Alert.alert(
        title,
        message.body,
        [
          {text: 'Close', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Open', onPress: () => this.props.navigation.navigate('Notifications')},
        ],
        { cancelable: false }
      )
    });
    */

    //*
    if (this.props.token == null || this.props.token.length == 0) {
      UserStore.token()
        .then((response) => {
          this.setState({
            token: response,
            url: this.props.uri + "?user_token=" + response,
            refreshing: false,
          });
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      this.setState({
        token: this.props.token,
        url: this.props.uri + "?user_token=" + this.props.token,
        refreshing: false,
      });
    }
    /*
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        
      }
    );

    */
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });

    if (navState.url.includes("/payfort/success")) {
      var prev = this.state.previousUrl;
      this.setState({
        previousUrl: "",
        url: prev,
        withMessage: true,
      });
    }
  }
  componentDidMount() {
    this.setState({
      url: this.props.uri,
    });
  }

  hideSpinner = () => {
    this.setState({ visible: false });
  };
  showSpinner = () => {
    this.setState({ visible: true });
  };

  _renderWebView() {
    const injectedJavascript = `(function() {
      window.postMessage = function(data) {
          window.ReactNativeWebView.postMessage(data);
        };
      })()`;

    return (
      <WebView
        ref={WEBVIEW_REF}
        style={styles.webview}
        onLoadStart={() => this.showSpinner()}
        onLoad={() => this.hideSpinner()}
        bounces={false}
        injectedJavaScript={injectedJavascript}
        startInLoadingState={true}
        source={{ uri: this.state.url }}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        onMessage={this.onWebviewMessage.bind(this)}
      />
    );
  }

  render() {
    if (this.context.internet === "true") {
      // if (true) {
      return (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={this.props.statusBarBackground}
            barStyle={this.props.statusBarStyle}
          />
          <InternetStatusAlert />
          {this._renderWebView()}

          {this.state.visible && (
            <ActivityIndicator
              style={{
                flex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
              size="large"
            />
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.textContainer}>
          <Image
            style={{
              height: "85%",
              width: "75%",
              resizeMode: "contain",
              // borderColor: "red",
              // borderWidth: 3,
            }}
            source={require("../utils/common/img/logo_app.png")}
          />
          <Text
            style={{
              alignSelf: "center",
              color: "red",
              fontSize: 14,
              fontWeight: "bold",
              marginTop: Platform.OS === "ios" ? 1 : 5,
            }}
          >
            No internet. Please check your connection and try again
          </Text>
          {/* <Button onPress={this.refreshScreen} title="Refresh Screen" /> */}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.backgroundColor,
  },

  loading: {
    position: "absolute",
    left: 25,
    top: 100 * 0.93,
    width: 50,
    height: 50,
    zIndex: 2,
  },

  webview: {
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    alignSelf: "center",
  },
  offlineText: {
    color: "red",
  },
});

WebViewScreen.defaultProps = {
  statusBarBackground: "rgba(0, 0, 0, 1)",
  statusBarStyle: "dark-content",
};

export default withNavigation(WebViewScreen);

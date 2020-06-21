import React, { Component } from "react";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import MainScreen from "./screens/MainScreen";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignInScreen from "./screens/auth/SignInScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import ForgotPasswordScreen from "./screens/auth/ForgotPasswordScreen";
import {InternetStatusProvider} from  "./context/InternetStatusContext" ;

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  withNavigation,
} from "react-navigation";
import apiConfig from "./utils/network/config";

import { userToken, user } from "./utils/store/user";

const RegScreen = ({ navigation }) => (
  <RegisterScreen uri={apiConfig.appUrl + "/register"} token={userToken} />
);

const AuthStack = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerStyle: {
          backgroundColor: "transparent",
          height: 0,
          elevation: null,
        },
        header: null,
      }),
    },

    SignIn: {
      screen: SignInScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTintColor: "transparent",
        headerStyle: {
          backgroundColor: "transparent",
          height: 0,
          elevation: null,
        },
        headerMode: "none",
        header: null,
      }),
    },
    Register: {
      screen: RegScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTintColor: "transparent",
        headerStyle: {
          backgroundColor: "transparent",
          height: 0,
          elevation: null,
        },
        headerMode: "none",
        header: null,
      }),
    },
    ForgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTintColor: "transparent",
        headerStyle: {
          backgroundColor: "transparent",
          height: 0,
          elevation: null,
        },
        headerMode: "none",
        header: null,
      }),
    },
  },
  {}
);

const AppStack = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    // Home: HomeScreen,
    // Main: MainScreen,
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      Starter: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Starter",
    }
  )
);

export default () => {
  return (
      <InternetStatusProvider>
        <App />
      </InternetStatusProvider>
  );
};

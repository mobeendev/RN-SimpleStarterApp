import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";

import MainScreen from "../screens/MainScreen";
import VideoScreenAndroid from "../screens/VideoScreenAndroid";
import VideoScreenIos from "../screens/VideoScreenIos";
import WebAppScreen from "../screens/WebAppScreen";
import VideoScreen from "../screens/VideoScreen";
import VideoScreenSwitch from "../screens/VideoScreenSwitch";
import Reducer from "../screens/Reducer";

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    WebApp: WebAppScreen,
    VideoScreenIos: VideoScreenIos,
    VideoScreenAndroid: VideoScreenAndroid,
    VideoScreen: VideoScreen,
  },
  {
    navigationOptions: {},
  }
);

const AppNavigatorSwitch = createSwitchNavigator({
  App: AppNavigator,
  VideoScreenSwitch: VideoScreenSwitch,
});

export default createAppContainer(AppNavigatorSwitch);

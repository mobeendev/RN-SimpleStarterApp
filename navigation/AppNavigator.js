import { createStackNavigator, createAppContainer } from "react-navigation";

import MainScreen from "../screens/MainScreen";
import VideoScreen from "../screens/VideoScreen";
import WebAppScreen from "../screens/WebAppScreen";
import SimpleFunctionalCompScreen from "../screens/SimpleFunctionalCompScreen";
import SimpleClassCompScreen from "../screens/SimpleClassCompScreen";
import Reducer from "../screens/Reducer";
import CalendarScreen from "../screens/CalendarScreen";

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    SimpleFunc: SimpleFunctionalCompScreen,
    SimpleClass: SimpleClassCompScreen,
    WebApp: WebAppScreen,
    Reducer: Reducer,
    Calendar: CalendarScreen,
  },
  {
    navigationOptions: {},
  }
);

export default createAppContainer(AppNavigator);

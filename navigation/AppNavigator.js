import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import VideoScreen from '../screens/VideoScreen';
import WebAppScreen from '../screens/WebAppScreen';
import SimpleFunctionalCompScreen from '../screens/SimpleFunctionalCompScreen';
import SimpleClassCompScreen from '../screens/SimpleClassCompScreen';

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    SimpleFunc: SimpleFunctionalCompScreen,
    SimpleClass: SimpleClassCompScreen,
    WebApp: WebAppScreen,
    Video: VideoScreen,
  },
  {
    navigationOptions: {

    }
   }
);

export default createAppContainer(AppNavigator);

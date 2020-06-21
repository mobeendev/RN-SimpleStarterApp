import { createStackNavigator, createAppContainer } from 'react-navigation';

import VideoScreen from '../screens/VideoScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import MapScreen from '../screens/MapScreen';
import MainScreen from '../screens/MainScreen';
import AuthLoading from '../screens/AuthLoadingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import CameraLauncher from '../components/CameraLauncher';


const AuthStack = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerStyle: {
          backgroundColor: 'transparent',
          height: 0,
          elevation: null
        },
        header: null,
      })
    },
    
    SignIn: {
      screen: SignInScreen,
      navigationOptions: ({ navigation }) => ({
        title: "",
        headerTintColor: 'transparent',
        headerStyle: {
          backgroundColor: 'transparent',
          height: 0,
          elevation: null
        },
        headerMode: 'none',
        header: null,
      })
    },
   
  }, {
    
  }
)




const AppStack = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Main: MainScreen,
    Home: HomeScreen,
    Camera: CameraLauncher,
    Video: VideoScreen,
    Map: MapScreen,
    SignIn: SignInScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
);



export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);


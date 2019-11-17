import React, {Component} from 'react';
import { Animated, StyleSheet, Text, View, Easing} from 'react-native';
import Dashboard from "./views/Dashboard/view";
import LoadingScreen from "./views/LoadingScreen/view";
import DayNightScreen from "./views/DayNightScreen/view";
import InitSettingScreen from "./views/InitSettingScreen/view";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Font from 'expo-font';
//import Animated from 'react-native-reanimated';

export default class App extends Component {
  constructor ()
  {
    super ()
    this.state = {
      fontLoaded: false,
    }
  }
  //load the fonts
  async componentDidMount () {
    await Font.loadAsync({
      'montserrat': require ('./assets/fonts/Montserrat.ttf'),
      'montserrat-bold': require ('./assets/fonts/Montserrat-Bold.ttf'),
      'simsun': require ('./assets/fonts/SimSun.ttf'),
      'gilroy-extrabold': require ('./assets/fonts/Gilroy-ExtraBold.ttf'),
      'gilroy-light': require ('./assets/fonts/Gilroy-Light.ttf'),
    });
    //sets the state to true after the font is loaded
    this.setState({fontLoaded: true});
  }

  render () {
    return (
      this.state.fontLoaded? <AppContainer/> :
      //actually supposed to be the splash screen
      <View style = {{flex: 1, backgroundColor: 'black'}}>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Loading: LoadingScreen,
    DayNight: DayNightScreen,
    InitSetting: InitSettingScreen,
    Dash: Dashboard,
  },
  {
    initialRouteName: 'DayNight', //temporary
    //in charge of transition animation:
    transitionConfig: () => ({
        transitionSpec: {
          duration: 550,
          easing: Easing.inOut(Easing.ease),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
          //console.log (sceneProps);
          const {layout, position, scene} = sceneProps;
          const width = layout.initWidth;
          const height = layout.initHeight;
          const {index, route} = scene;
          const params = route.params || {} //that's i don't know what this does really
          const transition = params.transition || 'default';
          return {
            default: fade (index, position, width)
          } [transition];
        },
    }),
    defaultNavigationOptions: {
      header: null, //hides the header/navigation bar
    }
  }
);

const AppContainer = createAppContainer (AppNavigator);

let fade = (index, position, width) => {
  const fade = position.interpolate ({
    inputRange: [index - 1, index],
    outputRange: [0, 1],
  })
  return {opacity : fade}
};

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from "./views/Dashboard/view";
import LoadingScreen from "./views/LoadingScreen/view";
import DayNightScreen from "./views/DayNightScreen/view";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as Font from 'expo-font';

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
    });
    //sets the state to true after the font is loaded
    this.setState({fontLoaded: true});
  }

  render () {
    return (
      this.state.fontLoaded? <AppContainer/> : null
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    DayNight: DayNightScreen,
    Loading: LoadingScreen,
    Dash: Dashboard,
  },
  {
    initialRouteName: 'DayNight', //temporary
    defaultNavigationOptions: {
      header: null, //hides the header/navigation bar
    }
  }
);

const AppContainer = createAppContainer (AppNavigator);
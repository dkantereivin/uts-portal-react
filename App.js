import React from 'react';
import * as firebase from 'firebase';
import * as Font from 'expo-font';
import { SafeAreaView, Text, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Buildings from './views/Buildings/view';
import Welcome from './views/Welcome/view';
import Login from './views/Login/view';
import DayNight from './views/DayNight/view';
import Subscription from './views/Subscription/view';
import SetMonday from './views/SetMonday/view';
import SetTuesday from './views/SetTuesday/view';
import FinalSetup from './views/FinalSetup/view';
import Home from './views/Home/view';
import Schedule from './views/Schedule/view';
import Transitions from './assets/Transitions';

import Data from './Data';

const firebaseConfig = {
    apiKey: "AIzaSyCkMVXbgG-8l_vPXo5EoHDw3lB2HXKm4Y4",
    authDomain: "uts-portal-293.firebaseapp.com",
    databaseURL: "https://uts-portal-293.firebaseio.com",
    projectId: "uts-portal-293",
    storageBucket: "uts-portal-293.appspot.com",
    messagingSenderId: "367766824243",
};

firebase.initializeApp(firebaseConfig);

const handleTransitions = ({scenes}) => {
    const next = scenes[scenes.length - 1].route.routeName;

    switch(next)
    {
        case 'Welcome':         return Transitions.fadeIn(1000);
        case 'Login':           return Transitions.fadeOut(1000);
        case 'DayNight':        return Transitions.fromRight(300);
        case 'Subscriptions':   return Transitions.fromRight(500);
        case 'SetMonday':       return Transitions.fromRight(500);
        case 'SetTuesday':      return Transitions.fromRight(500);
        case 'FinalSetup':      return Transitions.fromRight(500);
        case 'Home':            return Transitions.fadeIn(200);
        default:                return Transitions.fadeIn(300);
    }
}

const gNavigator = createStackNavigator({
    Buildings,
    Welcome,
    Login,
    DayNight,
    Subscription,
    SetMonday,
    SetTuesday,
    FinalSetup,
    Home,
    Schedule
},
{
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: (nav) => handleTransitions(nav)
});

const GlobalContainer = createAppContainer(gNavigator);

class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            firstTime: null
        }
    }

    componentDidMount()
    {
        Promise.all([
            Data.setDefaults(),
            Data.updateAll(),
            Font.loadAsync({
                'gilroy': require('./assets/fonts/gilroy.ttf'),
                'gilroy-bold': require('./assets/fonts/gilroy-bold.ttf'),
                'montserrat': require('./assets/fonts/montserrat.ttf'),
                'montserrat-bold': require('./assets/fonts/montserrat-bold.ttf')
            })
        ]).then(() => this.setState({firstTime: true}))
        
    }

    render()
    {
        if (this.state.firstTime == null)
            return (<Text>{null}</Text>);
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'always' }}>
                <GlobalContainer />
            </SafeAreaView>
        );
    }
}



export default App;
import React from 'react';
import * as Font from 'expo-font';
import { SafeAreaView, Text, View, Switch, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as ReactTransitions from 'react-navigation-transitions'; // https://github.com/plmok61/react-navigation-transitions/blob/master/src/index.js

import Buildings from './views/Buildings/view';
import Welcome from './views/Welcome/view';
import Login from './views/Login/view';
import DayNight from './views/DayNight/view';
import Subscription from './views/Subscription/view';
import SetMonday from './views/SetMonday/view';
import SetTuesday from './views/SetTuesday/view';
import ScheduleScreen from './views/ScheduleScreen/view';
import FinalSetup from './views/FinalSetup/view';
import Settings from './views/Settings/view';
import Transitions from './assets/Transitions';
import * as firebase from 'firebase';
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
    const next = scenes[scenes.length-1].route.routeName;

    switch(next)
    {
        case 'Welcome':         return Transitions.fadeIn(1000);
        case 'Login':           return Transitions.fadeOut(1000);
        case 'DayNight':        return Transitions.fromRight(300);
        case 'Subscriptions':   return Transitions.fromRight(500);
        case 'SetMonday':       return Transitions.fromRight(500);
        case 'SetTuesday':      return Transitions.fromRight(500);
        case 'FinalSetup':      return Transitions.fromRight(500);
        case 'Settings':        return Transitions.fromRight(500);
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
    Settings
},
{
    initialRouteName: 'SetMonday',
    // initialRouteName: 'Buildings',
    headerMode: 'none',
    transitionConfig: (nav) => handleTransitions(nav)
    // transitionConfig: () => ({
    //     transitionSpec: Transitions.transitionSpec(),
    //     screenInterpolator: (sceneProps) => Transitions.screenInterpolator(sceneProps)
    // })
});

const GlobalContainer = createAppContainer(gNavigator);

class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            firstTime: null,
            fontLoaded: false,
        }
    }

    componentWillMount()
    {
        AsyncStorage.getItem('@device/token')
            .then((val) => this.setState({firstTime: val == null || val == undefined}));
        
    }
    async componentDidMount()
    {
        await Data.setDefaults();
        await Data.updateAll();
        await Font.loadAsync({
            'gilroy': require('./assets/fonts/gilroy.ttf'),
            'gilroy-bold': require('./assets/fonts/gilroy-bold.ttf'),
            'montserrat': require('./assets/fonts/Montserrat.ttf'),
            'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf')
        })
        this.setState ({fontLoaded: true})
    }

    render()
    {
        if (this.state.firstTime == null || !this.state.fontLoaded)
            return (<Text>{null}</Text>);
        return (
            <ScheduleScreen/>
            /*
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'always' }}>
                <GlobalContainer />
            </SafeAreaView>*/
        );
    }
}

export default App;

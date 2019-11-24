import React from 'react';
import * as Font from 'expo-font';
import { SafeAreaView, Text, View, AsyncStorage } from 'react-native';
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
import FinalSetup from './views/FinalSetup/view';
import Settings from './views/Settings/view';
import Transitions from './assets/Transitions';


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
    initialRouteName: 'Buildings',
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
            firstTime: null
        }
    }

    componentWillMount()
    {
        AsyncStorage.getItem('@device/token')
            .then((val) => this.setState({firstTime: val == null || val == undefined}));
    }

    componentDidMount()
    {
        Font.loadAsync({
            'gilroy': require('./assets/fonts/gilroy.ttf'),
            'gilroy-bold': require('./assets/fonts/gilroy-bold.ttf'),
            'montserrat': require('./assets/fonts/montserrat.ttf'),
            'montserrat-bold': require('./assets/fonts/montserrat-bold.ttf')
        });
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

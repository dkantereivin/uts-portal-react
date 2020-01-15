import React from 'react';
import * as firebase from 'firebase';
import * as Font from 'expo-font';
import { SafeAreaView, Text, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Constants from 'expo-constants';
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
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
import Settings from './views/Settings/view';
import Articles from './views/Articles/view';
import Transitions from './assets/Transitions';


import Data from './Data';

const tabBarStackNavigator = createStackNavigator(
{
    Home, Schedule, Articles, Settings,
}, 
{
    initialRouteName: 'Home',
    headerMode: 'none',
})


class TabbarNavigator extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            firstTime: null,
            notification: {}
        }
    }
    
    render()
    {
        
        if (this.state.firstTime == null)
            return (<Text>{null}</Text>);
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'always' }}>
               {/* <Settings/>*/}
                <GlobalContainer />
            </SafeAreaView>
        );
    }
}

export default TabBarNavigator;

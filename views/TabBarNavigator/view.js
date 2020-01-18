import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Animated, Image, UIManager, Easing, Dimensions, Keyboard, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";

const {width, height} = Dimensions.get('window');
const {State} = TextInput

import Home from '../Home/view';
import Schedule from '../Schedule/view';
import Settings from '../Settings/view';
import Articles from '../Articles/view';
import Navbar from '../../components/Navbar';
import Transitions from '../../assets/Transitions';

const handleTransitions = ({scenes}) => {
    const next = scenes[scenes.length - 1].route.routeName;

    switch(next)
    {
        default:                return Transitions.fadeIn(300);
    }
}

const TabBarContainer = createStackNavigator(
{
    Home, Schedule, Articles, Settings,
}, 
{
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: (nav) => handleTransitions(nav),
    navigationOptions: {
        gesturesEnabled: false,
        swipeEnabled: false,
    }
})

class TabBarNavigator extends React.Component
{
    static navigationOptions = {
        gesturesEnabled: false,
        swipeEnabled: false,
    };
    //importants
    static router = TabBarContainer.router;

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
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'never', bottom: 'always' }}>
                <View style = {{flex: 1}}>
                    <TabBarContainer navigation = {this.props.navigation}/>
                    <Navbar navigation = {this.props.navigation}/>
                </View>
            </SafeAreaView>
        );
    }
}

export default TabBarNavigator;

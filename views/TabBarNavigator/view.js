import React from 'react';
import { createAppContainer } from 'react-navigation';
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
    Home:{
        screen:Home,
        navigationOptions:{
            gesturesEnabled:false
        }
    }, Schedule, Articles, Settings,
}, 
{
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig: (nav) => handleTransitions(nav)
})

class TabBarNavigator extends React.Component
{
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
            <View style = {{flex:1}}>
                <TabBarContainer navigation = {this.props.navigation}/>
                <Navbar navigation = {this.props.navigation}/>
            </View>
        );
    }
}

export default TabBarNavigator;

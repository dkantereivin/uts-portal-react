import React, {Component} from 'react';
import { Animated, Image, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Navbar from './assets/Navbar';

import style from "./style";
//import aVals from "./animate";

const images = {
};

class Dashboard extends Component
{
    style = style;

    constructor()
    {
        super();

    }

    render()
    {
        return (
            <View style={style.background}>
                <View style={style.display} />
                <Navbar />
            </View>
        );
    }
} 

export default Dashboard;

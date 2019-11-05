import React, {Component} from 'react';
import { Animated, Image, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Navbar from './components/Navbar';

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
                


            <Navbar />
            </View>
        );
    }
} 

export default Dashboard;

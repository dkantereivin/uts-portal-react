import React, {Component} from 'react';
import { Animated, Image, View, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

import style from "./style";

const images = {
    dayImage: require ('./assets/dayImage.png'),
    nightImage: require ('./assets/nightImage.png'),
};

class DayNightScreen extends Component {
    style = style;
    render()
    {
        return (
        <View style = {{flex: 1, flexDirection: 'column'}}>
            <Image style = {style.nightImage} source = {images.nightImage}/>
            <Image style = {style.dayImage} source = {images.dayImage}/>
            <Text style = {style.orText}>
                OR
            </Text>
        </View>
        );
    }
}

export default DayNightScreen;
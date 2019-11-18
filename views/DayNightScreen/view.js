import React, {Component} from 'react';
import { Animated, Easing, Image, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
//import { Easing } from 'react-native-reanimated';
const {width} = Dimensions.get('window');

import style from "./style";

const images = {
    dayImage: require ('./assets/dayImage.png'),
    nightImage: require ('./assets/nightImage.png'),
};

class DayNightScreen extends Component {
    style = style;
    animation = new Animated.Value (1);

    componentDidMount ()
    {
        this.setState (this.animateIn);
    }

    dayPressed = () => {
        //do something to store day
        this.toInitSetting();
    }

    nightPressed = () => {
        // do something to store night
        this.toInitSetting();
    }

    toInitSetting = () => {
        this.setState (this.animateOut);
        this.props.navigation.navigate ('InitSetting', {transition: 'fadespecial'});
    }

    animateOut = () => Animated.timing(this.animation, {
        duration: 600,
        toValue: 1,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
    }).start()

    animateIn = () => Animated.timing (this.animation, {
        duration: 600,
        toValue: 0,
        easing: Easing.out (Easing.poly(4)),
        useNativeDriver: true,
    }).start()


    render()
    {
        //animations
        const translate1 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, width],
        })
        const translate2 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, -width],
        })
        const translate3 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [1, 0],
        })

        return (
        <View style = {style.bigView}>
            <TouchableOpacity onPress = {this.nightPressed} style = {style.nightPressed}>
                <Animated.Image style = {[style.nightImage, {transform: [{translateX: translate1}]}]} source = {images.nightImage} resizeMode = 'stretch'/>
            </TouchableOpacity>
            <TouchableOpacity onPress = {this.dayPressed} style = {style.dayPressed}>
                <Animated.Image style = {[style.dayImage, {transform: [{translateX: translate2}]}]} source = {images.dayImage} resizeMode = 'stretch'/>
            </TouchableOpacity>
            <Animated.Text style = {[style.orText, {opacity: translate3}]}>
                OR
            </Animated.Text>
        </View>
        );
    }
}

export default DayNightScreen;
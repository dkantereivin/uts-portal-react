import React, {Component} from 'react';
import { Animated, Image, Easing, Dimensions, View, Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
//this easing that is commented out is bad and it crashes stuff
//import { Easing } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const images = {
    weirdPerson: require ("./assets/weirdPerson.png"),
};

class InitSettingScreen extends Component {
    style = style;
    animation = new Animated.Value (0);

    //do animation when the component is mounted
    componentDidMount () {
        this.setState (this.animate);
    }

    animate = () => Animated.timing (this.animation, {
        toValue: 1,
        duration: 750,
        easing: Easing.inOut (Easing.ease),
    }).start()

    render()
    {
        const translate1 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [-height, 0],
        })

        return (
        <View>
            <Animated.Image style = {[style.weirdPerson, {transform: [{translateY: translate1}]}]} source = {images.weirdPerson}/>            
            <Animated.Text style = {style.title}>
                WHAT ARE YOU INTO?
            </Animated.Text>
            <Animated.Text style = {style.subtitle}>
                Tell us what you like, and we'll tell you what to know.
            </Animated.Text>
        </View>         
        );
    }
}

export default InitSettingScreen;
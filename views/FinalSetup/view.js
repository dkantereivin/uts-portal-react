import React, {Component} from 'react';
import { Animated, Image, Easing, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
//this easing that is commented out is bad and it crashes stuff
//import { Easing } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const images = {
    clouds: require ('./assets/Group.png'),
    dream: require ('./assets/Dream.png'),
};

class FinalSetup extends Component {

    animation = new Animated.Value (0);

    componentDidMount () {
        this.setState (this.animate);
    }

    constructor () {
        super ();
    }

    open () {
        this.props.navigation.navigate('TabBarNavigator');
    }

    animate = () => Animated.timing (this.animation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
    }).start()

    render () {

        const translate1 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [height, 0],
        })

        const translate2 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [-height, 0],
        })

        return (
            <View style = {{flex: 1, overflow: 'hidden'}}>
                <Animated.Image style = {[style.clouds, {transform: [{translateY: translate2}]}]} source = {images.clouds} resizeMode = 'stretch'/>
                <Animated.Image style = {[style.dream, {transform: [{translateY: translate1}]}]} source = {images.dream} resizeMode = 'stretch'/>
                <TouchableOpacity style = {style.openButton} onPress = {() => this.open()}>
                    <Text style = {style.openText}>
                        open my portal.
                    </Text>
                </TouchableOpacity>
                <Text style = {style.title}>
                    YOU'RE ALL SET! PORTAL IS READY.
                </Text>
                <Text style = {style.subtitle}>
                    We've created a world just for you.
                </Text>
            </View>
        );
    }
}

export default FinalSetup;
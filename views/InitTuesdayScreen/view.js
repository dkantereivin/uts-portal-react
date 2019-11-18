import React, {Component} from 'react';
import { Animated, Image, Easing, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
//this easing that is commented out is bad and it crashes stuff
//import { Easing } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const images = {
    sadwoman: require ('./assets/sadwoman.png'),
};

class InitTuesdayScreen extends Component {

    classesTuesday = new Array ("", "", "", "", "");
    classesNames = new Array ("period one", "period two", "period three", "period four", "period five");
    animation = new Animated.Value (0);

    constructor ()
    {
        super ()
        this.next = this.next.bind (this);
        this.createStackTuesday = this.createStackTuesday.bind (this);
    }

    componentDidMount () {
        this.setState (this.animateIn);
    }

    next () {
        this.setState (this.animateOut)
        this.props.navigation.navigate ('Welcome', {transition: 'fade'})
        /*
        for (var x = 0; x < 5; x++)
        {
            console.log (this.classesTuesday [x]);
        }*/
    }
    animateOut = () => Animated.timing (this.animation, {
        toValue: 2,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out (Easing.poly(4))
    }).start()

    animateIn = () => Animated.timing (this.animation, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out (Easing.poly(4)),
    }).start()

    createStackTuesday = () => {
        let stack = []
        for (let i = 0; i < 5; i++)
        {
            stack.push(<TextInput key = {i} placeholder = {this.classesNames [i]} placeholderTextColor = '#E0E0E0' onChangeText = {(text) => this.classesTuesday[i] = text} style = {style.textInput}/>)
        }
        return stack;
    }

    render ()
    {
        //for image
        const translateYDIR = this.animation.interpolate ({
            inputRange: [0, 1, 2],
            outputRange: [height, 0, 0]
        })

        const translateXDIR = this.animation.interpolate ({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, -width*1.5],
        })

        //for stack and button
        const translateXDIR2 = this.animation.interpolate ({
            inputRange: [0, 1, 2],
            outputRange: [0, 0, width],
        })

        return (
            <View style = {{flex: 1, overflow: 'hidden'}}>
                <Animated.Image style = {[style.sadwoman, {transform: [{translateY: translateYDIR}, {translateX: translateXDIR}]}]} source = {images.sadwoman} resizeMode = 'stretch'/>
                <Animated.Text style = {style.tuesdayLabel}>
                    TUESDAY CLASSES.
                </Animated.Text>
                <Animated.View style = {[style.stackView, {transform: [{translateX: translateXDIR2}]}]}>
                    {this.createStackTuesday()}
                </Animated.View>
                <TouchableOpacity style = {[style.nextButton, {transform: [{translateX: translateXDIR2}]}]} onPress = {this.next}>
                    <Text style = {style.nextText}>
                        next.
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default InitTuesdayScreen;
import React, {Component} from 'react';
import { KeyboardAvoidingView, Animated, Image, Easing, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";
//this easing that is commented out is bad and it crashes stuff
//import { Easing } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const images = {
    sadman: require ('./assets/sadman.png'),
};

class SetMonday extends Component {

    classesMonday = new Array ("", "", "", "", "");
    classesNames = new Array ("period one", "period two", "period three", "period four", "period five");

    animation = new Animated.Value (0);

    constructor ()
    {
        super ()
        this.next = this.next.bind (this);
        this.createStackMonday = this.createStackMonday.bind (this);
    }

    next () {
        Data.initTimetable (true, this.classesMonday);
        this.setState (this.animateOut);
        this.props.navigation.navigate ("SetTuesday");
    }

    animateOut = () => Animated.timing (this.animation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out (Easing.poly (4)),
        useNativeDriver: true,
    }).start();

    createStackMonday = () => {
        let stack = []
        for (let i = 0; i < 5; i++)
        {
            stack.push(<TextInput key = {i} placeholder = {this.classesNames [i]} placeholderTextColor = '#E0E0E0' onChangeText = {(text) => this.classesMonday[i] = text} style = {style.textInput}/>)
        }
        return stack;
    }

    render ()
    {
        const translate = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, -width],
        })

        return (
            <View style = {{flex: 1, overflow: 'hidden'}}>
                <Animated.Image style = {[style.sadman, {transform: [{translateX: translate}]}]} source = {images.sadman} resizeMode = 'stretch'/>
                <Animated.Text style = {style.mondayLabel}>
                    MONDAY CLASSES.
                </Animated.Text>
                <Animated.View style = {style.stackView}>
                    {this.createStackMonday()}
                </Animated.View>
                <TouchableOpacity style = {style.nextButton} onPress = {() => this.next()}>
                    <Text style = {style.nextText}>
                        next.
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SetMonday;
import React, {Component} from 'react';
import { KeyboardAvoidingView, UIManager, Keyboard, Animated, Image, Easing, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";

const {width, height} = Dimensions.get('window');
const {State} = TextInput

const images = {
    sadman: require ('./assets/sadman.png'),
};

class SetMonday extends Component {

    classesMonday = new Array ("", "", "", "", "");
    classesNames = new Array ("period one", "period two", "period three", "period four", "period five");

    animation = new Animated.Value (0);
    shift = new Animated.Value (0);

    constructor ()
    {
        super ()
        this.next = this.next.bind (this);
        this.handleDidHide = this.handleDidHide.bind (this);
        this.handleDidShow = this.handleDidShow.bind (this);
        this.createStackMonday = this.createStackMonday.bind (this);
    }

    componentDidMount ()
    {
        this.DidHide = Keyboard.addListener('keyboardDidHide', this.handleDidHide)
        this.DidShow = Keyboard.addListener ('keyboardDidShow', this.handleDidShow)
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

    handleDidHide()
    {
        Animated.timing (this.shift, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }

    handleDidShow(event)
    {
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = State.currentlyFocusedField();
        UIManager.measure (currentlyFocusedField, (originX, originY, fieldWidth, fieldHeight, pageX, fieldTop) => {
            const gap = (height - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) return;
            Animated.timing (this.shift, {
                toValue: gap,
                duration: 200,
                useNativeDriver: true,
            }).start()
        })
    }

    render ()
    {
        const translate = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, -width],
        })
        return (
                <Animated.View style = {{flex: 1, overflow: 'hidden', transform: [{translateY: this.shift}]}}>
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
                </Animated.View>
        );
    }
}

export default SetMonday;
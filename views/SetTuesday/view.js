import React, {Component} from 'react';
import { Animated, Image, UIManager, Easing, Dimensions, Keyboard, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";

const {width, height} = Dimensions.get('window');
const {State} = TextInput

const images = {
    sadwoman: require ('./assets/sadwoman.png'),
};

class SetTuesday extends Component {

    classesTuesday = new Array ("", "", "", "", "");
    classesNames = new Array ("period one", "period two", "period three", "period four", "period five");
    animation = new Animated.Value (0);

    constructor ()
    {
        super ()
        this.next = this.next.bind (this);
        this.handleDidHide = this.handleDidHide.bind (this);
        this.handleDidShow = this.handleDidShow.bind (this);
        this.createStackTuesday = this.createStackTuesday.bind (this);
        this.shift = new Animated.Value (0);
    }

    componentDidMount () {
        this.setState (this.animateIn);
        this.DidHide = Keyboard.addListener('keyboardDidHide', this.handleDidHide)
        this.DidShow = Keyboard.addListener ('keyboardDidShow', this.handleDidShow)
    }

    next () {
        Data.initTimetable (false, this.classesTuesday);
        this.setState (this.animateOut)
        this.props.navigation.navigate ('FinalSetup')
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
            <Animated.View style = {{flex: 1, overflow: 'hidden', transform: [{translateY: this.shift}]}}>
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
            </Animated.View>
        );
    }
}

export default SetTuesday;
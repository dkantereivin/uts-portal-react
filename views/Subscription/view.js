import React, {Component} from 'react';
import { Animated, Image, Easing, Dimensions, View, TouchableWithoutFeedback, Text} from 'react-native';
import Circle from './assets/Circle'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";

const images = {
    weirdPerson: require ("./assets/weirdPerson.png"),
    arrow: require ("./assets/Next.png"),
};

class Subscription extends Component {
    style = style;
    animation = new Animated.Value (0);

    //do animation when the component is mounted
    componentDidMount () {
        this.setState (this.animate);
    }

    toClasses = () => {
        this.props.navigation.navigate('SetMonday');
    }

    animate = () => Animated.timing (this.animation, {
        toValue: 1,
        duration: 600,
        easing: Easing.out (Easing.poly(4)),
        useNativeDriver: true,
    }).start()

    render()
    {
        const translate1 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [-hp(100)/2, 0],
        })

        return (
        <View style = {{flex: 1, flexDirection: 'column'}}>
            <View style = {style.weirdPersonContainer}>
                <Animated.Image style = {[style.weirdPerson, {transform: [{translateY: translate1}]}]} source = {images.weirdPerson} resizeMode = 'stretch'/> 
            </View>
            <Text style = {style.title}>
                WHAT ARE YOU INTO?
            </Text>
            <Text style = {style.subtitle}>
                Tell us what you like, and we'll tell you what to know.
            </Text>
            <View style = {style.generalCircle}>
                <Circle text = {'general'} diameter = {hp (118/812.0*100)} touchable = {true}/>  
            </View>
            <View style = {style.articleCircle}>
                <Circle text = {'articles'} diameter = {hp (98/812.0*100)} touchable = {true}/>
            </View>
            <View style = {style.surveysCircle}>
                <Circle text = {'surveys'} diameter = {hp (118/812.0*100)} touchable = {true}/>
            </View>
            <View style = {style.houseCircle}>
                <Circle text = {'house'} diameter = {hp (162/812.0*100)} touchable = {true}/>
            </View>
            <View style = {style.bottomLeftCircle}>
                <Circle diameter = {hp (118/812.0*100)} touchable = {false}/>
            </View>
            <View style = {style.leftCircle}>
                <Circle diameter = {hp (99/812.0*100)} touchable = {false}/>
            </View>
            <View style = {style.rightCircle}>
                <Circle diameter = {hp (118/812.0*100)} touchable = {false} segue = {true} delegate = {this}/>
            </View>
            <View style = {style.arrowContainer}>
                <TouchableWithoutFeedback onPress = {this.toClasses}>
                    <Image style = {style.arrow} source = {images.arrow} resizeMode = 'stretch'/>
                </TouchableWithoutFeedback>
            </View>
        </View>         
        );
    }
}

export default Subscription;
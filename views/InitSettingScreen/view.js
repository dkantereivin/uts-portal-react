import React, {Component} from 'react';
import { Animated, Image, Easing, Dimensions, View, Text} from 'react-native';
import Circle from '../../components/Circle'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
//this easing that is commented out is bad and it crashes stuff
//import { Easing } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const images = {
    weirdPerson: require ("./assets/weirdPerson.png"),
    arrow: require ("./assets/Next.png"),
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
        duration: 550,
        easing: Easing.inOut (Easing.ease),
    }).start()

    render()
    {
        const translate1 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [-height/2, 0],
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
                <Circle text = {'article'} diameter = {hp (98/812.0*100)} touchable = {true}/>
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
                <Circle diameter = {hp (118/812.0*100)} touchable = {false}/>
            </View>
            <Image style = {style.arrow} source = {images.arrow} resizeMode = 'stretch'/>
        </View>         
        );
    }
}

export default InitSettingScreen;
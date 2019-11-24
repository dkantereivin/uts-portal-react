import React from 'react';
import { Animated, Easing, View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'

import style from "./style";

const images = {
    day: require ('./assets/dayImage.png'),
    night: require ('./assets/nightImage.png'),
};

class DayNightSelection extends React.Component {
    
    constructor()
    {
        super();
        this.buttonTranslate = new Animated.Value (1);
    }

    onSelection(option)
    {
        const notifs = option === 'night' ? {time: '7:00 pm'} : {time: '8:00 am'}
        AsyncStorage.setItem("@user/notifications", JSON.stringify(notifs));
        this.nextScreen();
    }

    nextScreen()
    {
        Animated.timing(this.buttonTranslate, {
            duration: 600, toValue: 1, useNativeDriver: true // should custom easing be added?
        }).start(() => this.props.navigation.navigate('Subscription'));
    }

    componentDidMount()
    {
        Animated.timing(this.buttonTranslate, {
            duration: 600, toValue: 0, useNativeDriver: true // custom easing?  easing: Easing.out (Easing.poly(4))
        }).start();
    }

    render()
    {
        const animate = {
            nightPos: {transform: [
                {translateX: this.buttonTranslate.interpolate({inputRange: [0,1], outputRange: [0, wp(100)]})
            }]},
            dayPos: {transform: [
                {translateX: this.buttonTranslate.interpolate({inputRange: [0,1], outputRange: [0, -wp(100)]})
            }]}
        }

        return (
            <View style={style.container}>
                <TouchableOpacity style={style.nightButton} onPress={() => this.onSelection('night')}>
                    <Animated.Image style={[style.nightImg, animate.nightPos]} source={images.night}/>
                </TouchableOpacity>
                <View style={style.textBox}>
                    <Text style={style.text}>OR</Text>
                </View>
                <TouchableOpacity style={style.dayButton} onPress={() => this.onSelection('day')}>
                    <Animated.Image style={[style.dayImg, animate.dayPos]} source={images.day}/>
                </TouchableOpacity>

            </View>
        )
    }
}

export default DayNightSelection;
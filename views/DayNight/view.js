import React from 'react';
import { Animated, Easing, View, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Data from "../../Data"
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
        Data.setNotification ("notifTime", option === 'night' ? 2 : 1);
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
        this.loadListener = this.props.navigation.addListener('didFocus', () => {
            Animated.timing(this.buttonTranslate, {
                duration: 600, toValue: 0, useNativeDriver: true // custom easing?  easing: Easing.out (Easing.poly(4))
            }).start();
        });
    }

    componentWillUnmount()
    {
        this.loadListener.remove();
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
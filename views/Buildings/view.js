import style from './style';
import React from 'react';
import { View, Animated, AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const images = {
    frontBuildings: require('./assets/buildings.png'),
    rearBuildings: require('./assets/background.png'),
    logo: require('./assets/icon.png'),
    background: require('./assets/backgroundGradient.png')
}
 
class Buildings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.active = true;
        this.animateValue = new Animated.Value (0);
    }
 
    checkFirstTime()
    {
        AsyncStorage.getItem('@device_token')
            .then((val) => {
                if(val) {
                    this.active = false; 
                    this.props.navigation.navigate('Home');
                }
            });
    }

    moveBuildings()
    {
        Animated.timing (this.animateValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start(() => {
            sleep(1000).then(() => {if (this.active) this.props.navigation.navigate('Welcome')});
        });
    }
 
    componentDidMount()
    { 
        this.checkFirstTime();
        this.moveBuildings();
    }
 
    render()
    {
        const rearScale = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [1, 1.13155],})
        const frontScale = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [1, 1.2815],})
        const rearTranslateX = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [0, wp (16.196)]})
        const rearTranslateY = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [0, hp (14.545)]})
        const frontTranslateX = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [0, -wp (1.7387)]})
        const frontTranslateY = this.animateValue.interpolate ({inputRange: [0, 1], outputRange: [0, hp (13.54)]})
        const transform = {
            rear: {transform: [{scaleX: rearScale}, {scaleY: rearScale}, {translateX: rearTranslateX}, {translateY: rearTranslateY}]},
            front: {transform: [{scaleX: frontScale}, {scaleY: frontScale}, {translateX: frontTranslateX}, {translateY: frontTranslateY}]}
        }
        return (
            <View style={style.container}>
                <Animated.Image resizeMode="stretch" style={style.background} source={images.background} />
                <Animated.Image resizeMode="stretch" style={[style.rearBuildings, transform.rear]} source={images.rearBuildings} />
                <Animated.Image resizeMode="stretch" style={[style.frontBuildings, transform.front]} source={images.frontBuildings} />
                <Animated.Image resizeMode="stretch" style={[style.logo, {opacity: this.animateValue}]} source={images.logo}/>
            </View>
        )
    }
}
export default Buildings;

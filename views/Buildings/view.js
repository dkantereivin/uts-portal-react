import style from './style';
import React from 'react';
import { View, Animated } from 'react-native';
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
        this.animateValue = new Animated.Value (0);
    }
 
    moveBuildings()
    {
        Animated.timing (this.animateValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start(() => {
            sleep(1000).then(() => this.props.navigation.navigate('Welcome'));
        });
    }
 
    componentDidMount()
    { 
        this.moveBuildings() 
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

/* kept for future reference
const animate = {
    front: {
        startXY: {
            x: wp(-264/375.0*100),
            y: hp(257/812.0*100)
        },
        endXY: {
            x: wp(-415/375.0*100),
            y: hp(274/812.0*100)
        },
        startwidth: wp (1026.5/375.0*100),
        startheight: hp (660.5/812.0*100),
        maxScale: 1.2815
      //  maxScale: 0.2
    },
    rear: {
        startXY: {
            x: wp(-264/375.0*100),
            y: hp(-43/812.0*100)
        },
        endXY: {
            x: wp(-331/375.0*100),
            y: hp(19/812.0*100)
        },
        startwidth: wp(1942/375.0*100),
        startheight: hp (853/812.0*100),
        maxScale: 1.13155
        //maxScale: 0.2
    }
};
 
const images = {
    frontBuildings: require('./assets/buildings.png'),
    rearBuildings: require('./assets/background.png'),
    logo: require('./assets/icon.png'),
    background: require('./assets/backgroundGradient.png'),
    //icon: require('./assets/icon.png')
}
 
class Buildings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.animateValue = new Animated.Value (0);
    }
 
    moveBuildings()
    {
        Animated.timing (this.animateValue, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
        }).start()
    }
 
    componentDidMount()
    { 
        this.moveBuildings() 
    }
 
    animationComplete()
    {
        this.props.navigation.navigate('Welcome');
    }
 
    render()
    {
        const rearScale = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [1, animate.rear.maxScale],
        })

        const frontScale = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [1, animate.front.maxScale],
        })

        const rearTranslateX = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, animate.rear.endXY.x - animate.rear.startXY.x + animate.rear.startwidth*(animate.rear.maxScale-1)/2]
        })

        const rearTranslateY = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, animate.rear.endXY.y - animate.rear.startXY.y + animate.rear.startheight*(animate.rear.maxScale-1)/2]
        })

        const frontTranslateX = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, animate.front.endXY.x - animate.front.startXY.x +animate.front.startwidth*(animate.front.maxScale-1)/2]
        })

        const frontTranslateY = this.animateValue.interpolate ({
            inputRange: [0, 1],
            outputRange: [0, animate.front.endXY.y - animate.front.startXY.y + animate.front.startheight*(animate.front.maxScale-1)/2]
        })

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
*/

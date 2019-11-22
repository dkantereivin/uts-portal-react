import style from './style';
import React from 'react';
import { View, Image, Animated } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const animate = {
    front: { 
        startXY: {
            x: wp(-70.4),
            y: hp(31.65)
        },
        endXY: {//add the different of height or width /2 to adjust for scaling
            x: wp(-72.2),
            y: hp(45.23)
        },
        maxScale: 1.2815
    },
    rear: {
        startXY: {
            x: wp(-70.4),
            y: hp(-5.30)
        },
        endXY: {//add the different of height or width /2 to adjust for scaling
            x: wp(-54.13),
            y: hp(9.24)
        },
        maxScale: 1.13155
    },
    icon: {
        opacity: 1
    }
};

const images = {
    frontBuildings: require('./assets/buildings.png'),
    rearBuildings: require('./assets/background.png'),
    background: require('./assets/backgroundGradient.png'),
    icon: require('./assets/icon.png')
}

class Buildings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.rearBuildingsXY = new Animated.ValueXY(animate.rear.startXY);
        this.rearBuildingsScale = new Animated.Value(1);
        this.frontBuildingsXY = new Animated.ValueXY(animate.front.startXY);
        this.frontBuildingsScale = new Animated.Value(1);
        this.iconop=new Animated.Value(0);
    }

    moveBuildings()
    {
        Animated.parallel([
        Animated.timing(this.iconop,{toValue: animate.icon.opacity, duration: 4000}),
        Animated.timing(this.rearBuildingsXY, {toValue: animate.rear.endXY, duration: 4000}), 
        Animated.timing(this.rearBuildingsScale, {toValue: animate.rear.maxScale, duration: 4000}),
        Animated.timing(this.frontBuildingsXY, {toValue: animate.front.endXY, duration: 4000}),
        Animated.timing(this.frontBuildingsScale, {toValue: animate.front.maxScale, duration: 4000})
        ]).start(()=>this.animationComplete());
    }

    componentDidMount()
    { this.moveBuildings() }

    animationComplete()
    { 
        this.props.navigation.navigate('Welcome');
    }

    render()
    {
        const transform = {
            rear: {transform: [{scaleX: this.rearBuildingsScale}, {scaleY: this.rearBuildingsScale}]},
            front: {transform: [{scaleX: this.frontBuildingsScale}, {scaleY: this.frontBuildingsScale}]}
        };
        return (
            <View style={style.container}>
                <Animated.Image resizeMode="stretch" style={style.rearBuildings} source={images.background} />
                <Animated.Image resizeMode="stretch" style={[style.rearBuildings,this.rearBuildingsXY.getLayout(),transform.rear]} source={images.rearBuildings} />
                <Animated.Image resizeMode="stretch" style={[style.frontBuildings,this.frontBuildingsXY.getLayout(),transform.front]} source={images.frontBuildings} />
                <Animated.Image resizeMode="stretch" style={[style.icon,{opacity: this.iconop}]} source={images.icon} />
            </View>
        );
    }
    
}
export default Buildings;
import style from './style';
import React from 'react';
import { View, Image, Animated } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const animate = {
    rear: { // also top
        startXY: {
            x: wp(-70.5),
            y: hp(31.5)
        },
        endXY: {
            x: wp(-110.5),
            y: hp(33.5)
        },
        maxScale: 1.284
    },
    front: { // also bottom
        startXY: {
            x: wp(-70.5),
            y: hp(-5.5)
        },
        endXY: {
            x: wp(-88),
            y: hp(2.5)
        },
        maxScale: 1.672
    }
};

const images = {
    rearBuildings: require('./assets/buildings.png'),
    frontBuildings: require('./assets/frontBuildings.png'),
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

    }

    moveBuildings()
    {
        Animated.parallel([
            Animated.timing(this.rearBuildingsXY, {toValue: animate.rear.endXY, duration: 4000}),
            Animated.timing(this.rearBuildingsScale, {toValue: animate.rear.maxScale, duration: 4000}),
            Animated.timing(this.frontBuildingsXY, {toValue: animate.front.endXY, duration: 4000}),
            Animated.timing(this.frontBuildingsScale, {toValue: animate.front.maxScale, duration: 4000})
        ]).start(() => this.animationComplete());
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
                <Animated.Image style={[style.rearBuildings, this.rearBuildingsXY.getLayout(), transform.rear]} source={images.rearBuildings} />
                <Animated.Image style={[style.frontBuildings, this.frontBuildingsXY.getLayout(), transform.front]} source={images.frontBuildings} />
            </View>
        );
    }
    
}
export default Buildings;
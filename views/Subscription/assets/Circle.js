import React, {Component} from 'react';
import { Animated, Easing, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
//import { Easing } from 'react-native-reanimated';
import Data from '../../../Data';

class Circle extends Component {

    animation = new Animated.Value (0);
    select = false;

    constructor (props)
    {
        super (props)
        this.animation = this.props.touchable ? new Animated.Value (0) : new Animated.Value (1);
        this.select = !this.props.touchable;
        this.tapped = this.tapped.bind (this);
    }

    tapped () {
        if (this.props.touchable)
        {
            this.select ? (Animated.timing (this.animation, {
                toValue: 0,
                duration: 400,
                easing: Easing.inOut (Easing.ease)
            }).start()) : (Animated.timing (this.animation, {
                toValue: 1,
                duration: 400,
                easing: Easing.inOut (Easing.ease),
            }).start());
            this.select = !this.select
            if (this.props.text == "general")
            {
                Data.setNotification ("general", this.select);
            }
            else if (this.props.text == "articles")
            {
                Data.setNotification ("articles", this.select); //this has an 's'
            }
            else if (this.props.text == "house")
            {
                Data.setNotification ("house", this.select);
            }
            else if (this.props.text == "surveys")
            {
                Data.setNotification ("surveys", this.select);
            }
        }
        else 
        {
            if (this.props.segue)
            {
                this.props.delegate.toClasses();
            }
        }
    }

    render () {
        const colourAnim = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: ['#FFFFFF', '#536DFE']
        })

        const colourAnim2 = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: ['#536DFE', '#FFFFFF']
        })

        const scaling = this.animation.interpolate ({
            inputRange: [0, 1],
            outputRange: [1, 1.1]
        })

        return (
            <View>
                <TouchableWithoutFeedback onPress = {this.tapped}>
                    <Animated.View style = {{
                    width: this.props.diameter,
                    height: this.props.diameter,
                    borderRadius: this.props.diameter/2,
                    backgroundColor: colourAnim,
                    borderWidth: 2,
                    borderColor: '#536DFE',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [{scaleX: scaling}, {scaleY: scaling}]
                    }}>
                        <Animated.Text style = {{
                            fontFamily: 'montserrat',
                            fontSize: hp (18/812.0*100),
                            color: colourAnim2,
                        }}>
                            {this.props.text}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View> 
        );
    }
}

export default Circle;
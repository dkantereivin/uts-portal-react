import React, {Component} from 'react';
import { Animated, Easing, Image, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Data from '../Data';
//import { Easing } from 'react-native-reanimated';

class Switch extends Component {

    animation = new Animated.Value (0);
    select = false;
    
    constructor (props)
    {
        super (props)
        this.animation = this.props.value ? new Animated.Value (1) : new Animated.Value(0);
        this.select = this.props.value;
        this.changenotif = this.changenotif.bind(this);
        this.tapped = this.tapped.bind(this);
        this.state = {
            loaded: false,
            notifs: {}
        }
    }

    changenotif(key, newvalue){
        let newnotifs=this.state.notifs;
        newnotifs[key]=newvalue;
        this.setState({notifs: newnotifs});
        Data.setNotification(key,newvalue);
    }

    async componentDidMount(){
        let value = await Data.getNotification ();
        this.setState({notifs:value, loaded: true});
    }

    tapped ()
    {
        this.select ? (Animated.timing (this.animation, {
            toValue: 0,
            duration: 100,
            //easing: Easing.inOut (Easing.ease)
        }).start()) : (Animated.timing (this.animation, {
            toValue: 1,
            duration: 100,
            //easing: Easing.inOut (Easing.ease),
        }).start());
        this.select = !this.select
        this.changenotif(this.props.type,this.select);
    }

    render () {
        const colourAnim = this.animation.interpolate ({
            inputRange: [0, 1], outputRange: ['#DCDCDC', '#32CD32']
        })

        const translate = this.animation.interpolate ({
            inputRange: [0, 1], outputRange: [0, 27]
        })

        return (
            <View>
                <TouchableWithoutFeedback onPress = {this.tapped}>
                    <Animated.View style = {[style.background, {backgroundColor: colourAnim}]}>
                        <Animated.View style = {[style.circle, {transform: [{translateX: translate}]}]}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default Switch;

const style = StyleSheet.create({
    background: {
        position: 'absolute',
        left: wp (0),
        top: wp (0),
        width: wp (54/375.0*100),
        height: wp (29/375.0*100),
        borderRadius: wp (14.5/375.0*100),
    },
    circle: {
        position: 'absolute',
        left: wp (1/375.0*100),
        top: wp (1/375.0*100),
        backgroundColor: '#FFFFFF',
        width: wp(27/375.0*100),
        height: wp (27/375.0*100),
        borderRadius: wp (13.5/375.0*100),
    },
})
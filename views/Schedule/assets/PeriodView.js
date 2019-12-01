import React, {Component} from 'react';
import { Animated, Easing, Image, View, StyleSheet, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Data from "../../../Data";
//import { Easing } from 'react-native-reanimated';

class PeriodView extends Component {

    constructor (props)
    {
        super (props);
        this.format = this.format.bind (this);
        this.textchange = this.textchange.bind (this);
        this.changeornot = this.changeornot.bind (this);
        this.state = {
            data: props.data,
        }
    }

    format (date)
    {
        return this.helper(date.getHours()) + ":" + this.helper (date.getMinutes());
    }

    helper (num)
    {
        if (num < 10) return "0" + num;
        return num;
    }

    changeornot ()
    {
        if (this.state.data.classnumber == 0)
        {
            return <Text style = {style.textinput}>{this.state.data.name}</Text>
        }
        return <TextInput style = {style.textinput} value = {this.state.data.name} onChangeText = {(text) => this.textchange (text)} style = {style.textinput}/>
    }

    textchange (text)
    {
        Data.timetableupdate (this.props.aday == "A", this.props.flipped == "F", this.state.data.classnumber, text);
        let data = this.state.data;
        data ["name"] = text;
        this.setState (data);
    }

    render () {
        let start = new Date(this.state.data.startTime);
        let end = new Date(this.state.data.endTime);
        return (
            <View style = {style.container}>
                <Text style = {style.timelabel}>
                    {this.format(start)}{' - '}{this.format (end)}
                </Text>
                {this.changeornot()}
            </View>
        );
    }
}

const style = StyleSheet.create ({
    container: {
        height: hp (50/812.0*100),
        flexDirection: 'row',
        alignItems: 'center',
    },
    timelabel: {
        position: 'absolute',
        left: 0,
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy-bold',
        color: 'black',
    },
    textinput: {
        position: 'absolute',
        left: wp (150/375.0*100),
        right: 0,
        color: 'black',
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy',
    }
});

export default PeriodView;
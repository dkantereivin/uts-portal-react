import React, {Component} from 'react';
import { Animated, Easing, StyleSheet, Image, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback,Dimensions} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import PeriodView from './PeriodView';
import Data from "../../../Data";

const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]

const images = {
    noschoolimage: require ('./TV.gif'),
};

class ScheduleView extends Component {

    constructor (props)
    {
        super (props);
        this.generatePeriods = this.generatePeriods.bind (this);
        this.state = {
            eventIndex: 0,
        }
    }

    generatePeriods ()
    {
        //if there's no periods then just return an image
        if (this.props.data.periods.length == 0) 
        {
            return (
                <View>
                    <Image style = {{top: hp(-50/812.0*100), width: wp (309/375.0*100), height: hp (270/812.0*100)}} source = {images.noschoolimage}/>
                    <Text style = {{top: hp(-20/812.0*100), width: wp (309/375.0*100), fontFamily: 'gilroy', fontSize: wp(14/375.0*100), textAlign: 'center'}}>
                        Image credits attributed to Robin Davey
                    </Text>
                </View>
            );
        }
        let stack = []
        let ids = Data.gen_strings (this.props.data.periods.length);
        for (let i = 0; i < this.props.data.periods.length; i++)
        {
            stack.push(<PeriodView key = {ids [i]} aday = {this.props.data.abday} flipped = {this.props.data.flipornot} data = {this.props.data.periods [i]}/>)
        }
        return stack;
    }

    render () {
        let curr = new Date (this.props.data.date);
        let aorb = this.props.data.abday;
        let eventtext = null;
        if (this.props.data.events.length > 0)
        {
            let event = this.props.data.events [this.state.eventIndex]
            eventtext = event.titleDetail + " " + event.time;
        }
        else 
        {
            eventtext = "NOTHING MUCH.\ngo for a run or something"
        }
        return (
            <View style = {style.container}>
                <Text style = {style.weekday}>
                    {weekdays [curr.getDay()]}
                </Text>
                <Text style = {style.date}>
                    {months [curr.getMonth()]}{' '}{curr.getDate()}
                </Text>
                <Text style = {style.abday}>
                    {aorb == "N/A" ? null : aorb}
                </Text>
                <Text style = {style.daySchedule}>
                    {aorb == "N/A" ? null : "DAY SCHEDULE"}
                </Text>
                <View style = {[style.scrollview, {height: Math.min(hp (300/812.0*100), hp(this.props.data.periods.length*50/812.0*100))}]}>
                    <ScrollView automaticallyAdjustContentInsets = {false} alwaysBounceHorizontal = {false} alwaysBounceVertical = {true} style = {style.stackview}>
                        {this.generatePeriods()}
                    </ScrollView>
                </View>
                <TouchableOpacity style = {style.eventtextpos} onPress = {() => this.setState ({eventIndex: (this.state.eventIndex + 1)%this.props.data.events.length})}>
                    <Animated.Text style = {style.eventtext}>
                        {eventtext}
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    weekday: {
        position: 'absolute',
        top: hp (231/812.0*100),
        left: wp (31/375.0*100),
        fontSize: wp (40/375.0*100),
        // numberOfLines: 1,
        fontFamily: 'gilroy-bold'
    },
    date: {
        position: 'absolute',
        top: hp (280/812.0*100),
        left: wp (32/375.0*100),
        fontSize: wp (18/375.0*100),
        fontFamily: 'montserrat-bold',
    },
    container: {
        top: 0,
        backgroundColor: 'transparent', 
        width: wp (100),
        height: hp (100),
    },
    abday: {
        position: 'absolute',
        top: hp (315/812.0*100),
        left: wp (33/375.0*100),
        fontSize: wp (40/375.0*100),
        // numberOfLines: 1,
        fontFamily: 'gilroy-bold'
    },
    daySchedule: {
        position: 'absolute',
        top: hp (334/812.0*100),
        left: wp (73/375.0*100),
        fontSize: wp (18/375.0*100),
        // numberOfLines: 1,
        fontFamily: 'gilroy',
    },
    stackview: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp (309/375.0*100),
        flexDirection: 'column',
        // alignItems: 'stretch',
        // justifyContent: 'center',
    },
    eventtext: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy',
        color: 'black'
    },
    eventtextpos: {
        position: 'absolute',
        top: hp (150/812.0*100),
        left: wp (34/375.0*100),
        right: wp (34/375.0*100),
        height: hp (55/812.0*100),
    },
    scrollview: {
        position: 'absolute',
        top: hp (381/812.0*100),
        left: wp (33/375.0*100),
        width: wp (309/375.0*100),
    },
});

export default ScheduleView;
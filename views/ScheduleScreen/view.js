import React, {Component} from 'react';
import { KeyboardAvoidingView, Animated, Image, Easing, FlatList, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import ScheduleView from '../../components/ScheduleView'
import Data from "../../Data";
import { Platform } from '@unimodules/core';

const {width, height} = Dimensions.get('window');

class ScheduleScreen extends Component {

    getSchedule (item)
    {
        return (
            <ScheduleView data = {item}/>
        );
    }

    constructor (props)
    {
        super (props);
        this.flatlist = null;
        this.index = 0;
        this.pagination = this.pagination.bind (this);
        this.state = {
            dataLoaded: false,
            data: null
        }
    }

    async componentDidMount ()
    {
        let something = await Data.getWeekScheduleData ();
        this.setState ({data: something, dataLoaded: true});
    }

    render ()
    {
        if (!this.state.dataLoaded) {return <Text>{null}</Text>}
        return (
            <View style = {{flex: 1}}>
                <Text style = {style.whatsup}>
                    WHAT'S UP TODAY?
                </Text>
                <FlatList
                data = {this.state.data}
                renderItem = { ({item}) => this.getSchedule (item)}
                horizontal
                showsHorizontalScrollIndicator = {false}
                contentContainerStyle = {style.contentContainerStyle}
                keyExtractor = {item => item.id}
                //pass the reference to control
                ref = {(ref) => (this.flatlist = ref)}
                onScrollEndDrag = {(event) => {
                    this.pagination (event.nativeEvent)
                }}
                />
            </View>
        );
    }

    //Paging and scrolling and stuff
    pagination = (event) => {
        if (Math.abs(event.velocity.x) > 0.4)
        {
            let nextIndex = this.index;
            if (Platform.OS == "ios")
                nextIndex = event.velocity.x > 0 ? this.index + 1 : this.index - 1;
            else
                nextIndex = event.velocity.x < 0 ? this.index + 1 : this.index - 1;
            this.index = Math.min(Math.max (nextIndex, 0), 4);
            this.flatlist.scrollToIndex({index: this.index, animated: true})
        }
        else 
        {
            let numsCellShifted = Math.round(Math.abs (event.contentOffset.x/(wp (100))));
            this.index = Math.min(Math.max (numsCellShifted, 0), 4);
            this.flatlist.scrollToIndex({index: this.index, animated: true})
        }   
    }
}

export default ScheduleScreen;
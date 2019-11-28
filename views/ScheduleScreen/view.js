import React, {Component} from 'react';
import {Keyboard, UIManager, Animated, Image, Easing, FlatList, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import ScheduleView from '../../components/ScheduleView'
import Data from "../../Data";
import { Platform } from '@unimodules/core';
import { HitTestResultTypes } from 'expo/build/AR';

const {width, height} = Dimensions.get('window');
const {State} = TextInput;

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
        this.getSchedule = this.getSchedule.bind (this);
        this.handleWillHide = this.handleWillHide.bind (this);
        this.handleWillShow = this.handleWillShow.bind (this);
        this.update = this.update.bind (this);
        this.shift = new Animated.Value (0);
        this.state = {
            dataLoaded: false,
            data: null,
        }
    }

    async componentDidMount ()
    {
        this.WillHide = Keyboard.addListener('keyboardWillHide', this.handleWillHide)
        this.WillShow = Keyboard.addListener ('keyboardWillShow', this.handleWillShow)
        this.update();
    }

    componentWillUnmount()
    {
        this.WillShow.remove();
        this.didHide.remove();
    }

    async update ()
    {
        let something = await Data.getWeekScheduleData ();
        this.setState ({data: something, dataLoaded: true});
    }

    render ()
    {
        if (!this.state.dataLoaded) {return <Text>{null}</Text>}
        
        return (
            <Animated.View style = {[style.container, {transform: [{translateY: this.shift}]}]}>
                <Text style = {style.whatsup}>
                    WHAT'S UP TODAY?
                </Text>
                <FlatList
                    automaticallyAdjustContentInsets = {false}
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
            </Animated.View>
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
    //animations for keyboard shifting.
    handleWillHide()
    {
        //updates the data and rerenders the view when the keyboard is dismissed, assuming that data in the local database are updated.
        Animated.timing (this.shift, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => this.update());
    }

    handleWillShow(event)
    {
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = State.currentlyFocusedField();
        UIManager.measure (currentlyFocusedField, (originX, originY, fieldWidth, fieldHeight, pageX, fieldTop) => {
            const gap = (height - keyboardHeight) - (fieldTop + fieldHeight);
            if (gap >= 0) return;
            Animated.timing (this.shift, {
                toValue: gap,
                duration: 200,
                useNativeDriver: true,
            }).start()
        })
    }
}

export default ScheduleScreen;
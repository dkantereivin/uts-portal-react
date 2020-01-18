import React, {Component} from 'react';
import {Keyboard, UIManager, BackHandler, Animated, Image, Easing, KeyboardAvoidingView, FlatList, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {SafeAreaView} from 'react-navigation';
import style from "./style";
import ScheduleView from './assets/ScheduleView'
import Data from "../../Data";

import { Platform } from '@unimodules/core';

const {width, height} = Dimensions.get('window');
const {State} = TextInput;

class Schedule extends Component {

    static navigationOptions = {
        gesturesEnabled: false,
        swipeEnabled: false,
    };
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
        this.container = null;
        this.index = 0;
        this.pagination = this.pagination.bind (this);
        this.getSchedule = this.getSchedule.bind (this);
        this.handleDidHide = this.handleDidHide.bind (this);
        this.handleWillHide = this.handleWillHide.bind (this);
        this.handleBackButton = this.handleBackButton.bind(this);
        this.update = this.update.bind (this);
        this.shift = new Animated.Value (0);
        this.state = {
            dataLoaded: false,
            data: null,
            scrollEnabled: true,
        }
    }

    async componentDidMount ()
    {
        this.loadListener = this.props.navigation.addListener('didFocus', () => this.update());
        if (Platform.OS == "ios")
        {
            this.WillHide = Keyboard.addListener('keyboardWillHide', this.handleWillHide)
        }
        else
        {
            this.DidHide = Keyboard.addListener('keyboardDidHide', this.handleDidHide)
        }
        BackHandler.addEventListener('hardwareBackPress',  this.handleBackButton);
        this.update();
    }

    handleBackButton=()=>
    {
        return true;
    };

    componentWillMount ()
    {
        //take your time
        Data.updateAll();
    }

    componentWillUnmount()
    {
        this.loadListener.remove();
        if (Platform.OS == "ios")
        {
            this.WillHide.remove();
        }
        else
        {
            this.DidHide.remove();
        }
        BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButton);
    }

    async update ()
    {
        Data.getWeekScheduleData().then ((something) => this.setState ({data: something, dataLoaded: true}))
    }

    render ()
    {
        if (!this.state.dataLoaded) {return <Text>{null}</Text>}
        
        return (
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'never' }}>
                <View style = {{flex: 1}}>
                    <KeyboardAvoidingView style = {style.container} behavior = "position" keyboardVerticalOffset = {-hp (80/812.0*100)}>
                        <Text style = {style.whatsup}>
                            WHAT'S UP{'\n'}TODAY?
                        </Text>
                        <View style = {style.container}>
                            <FlatList
                                scrollEnabled = {this.state.scrollEnabled}
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
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
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

    handleDidHide()
    {
        this.update()
    }

    handleWillHide()
    {
        this.update();
    }
    
    // handleWillShow(event)
    // {
    //     const keyboardHeight = event.endCoordinates.height;
    //     const currentlyFocusedField = State.currentlyFocusedField();
    //     UIManager.measure (currentlyFocusedField, (originX, originY, fieldWidth, fieldHeight, pageX, fieldTop) => {
    //         const gap = (height - keyboardHeight) - (fieldTop + fieldHeight);
    //         if (gap >= 0) return;
    //         Animated.timing (this.shift, {
    //             toValue: gap-hp(6/812.0*100),
    //             duration: 200,
    //             useNativeDriver: true,
    //         }).start()
    //     })
    // }
}
export default Schedule;
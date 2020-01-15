import React, {Component} from 'react';
import {Keyboard, UIManager, Animated, Image, Easing, KeyboardAvoidingView, FlatList, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";
import { Platform } from '@unimodules/core';
import Navbar from '../../components/Navbar';

const {width, height} = Dimensions.get('window');
const {State} = TextInput;

const images = {
    sad: require ('./assets/sad.png'),
}

class Articles extends Component {

    render ()
    {
        return (
            <View style = {{flex: 1}}>
                <Image style = {style.sad} source = {images.sad} resizeMode = 'stretch'/>
                <Text style = {style.comingsoon}>
                    Coming Soon...{'\n'}We are hard at work trying to get this done.
                </Text>
                <Navbar navigation = {this.props.navigation}/>
            </View>
        );
    }
}
export default Articles;
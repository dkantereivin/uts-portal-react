import React, {Component} from 'react';
import { KeyboardAvoidingView, Animated, Image, Easing, Dimensions, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";
import Data from "../../Data";

const {width, height} = Dimensions.get('window');

class ScheduleScreen extends Component {

    render ()
    {
        return (
            <Text style = {style.whatsup}>
                WHAT'S UP TODAY?
            </Text>
        );
    }
}

export default ScheduleScreen;
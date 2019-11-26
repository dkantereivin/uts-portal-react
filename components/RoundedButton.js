import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(83,109,254,1)',
        width: wp(60.5),
        height: hp(7.5),
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'montserrat',
        fontSize: 24,
        color: 'white'
    }
});

class RoundedButton extends React.Component
{
    // props: text: str, onPress: func
    render()
    {
        return (
            <TouchableOpacity style={style.button} 
                              onPress={() => this.props.onPress()}>
                <Text style={style.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

export default RoundedButton;
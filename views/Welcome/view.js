import style from './style';
import {RoundedButton} from '../GlobalComponents';
import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

const images = {
    main: require("./assets/mainContent.png")
}

class Welcome extends React.Component
{
    render()
    {

        return (
            <View style={style.container}>
                <View style={style.topDiv} />
                <Image style={style.image} source={images.main} />
                <View style={style.textBox}>
                    <Text style={[style.text, {fontFamily: 'gilroy-bold'}]}>HEY THERE.</Text>
                    <Text style={[style.text, {fontFamily: 'gilroy'}]}>let's get started</Text>
                </View>
                <View style={style.buttonBuffer}>
                    <RoundedButton text="let's go!" onPress={() => this.props.navigation.navigate('Login')} />
                </View>
            </View>
        );
    }
    
}
export default Welcome;
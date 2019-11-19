import style from './style';
import {RoundedButton, TextInputField} from '../GlobalComponents';

import React from 'react';
import { View, Animated, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const images = {
    mainContent: require("./assets/image.png")
}

const domain = '@utschools.ca';

class Welcome extends React.Component
{
    constructor()
    {
        super()

        this.state = {
            infoMode: true // true loads info screen, false loads verify screen
        }

        this.inputAreaOpacity = new Animated.Value(1);
    }

    fadeInputArea()
    {
        Animated.timing(this.inputAreaOpacity, {toValue: 0, duration: 1500, useNativeDriver: true}).start(() => {
            this.setState({infoMode: !this.state.infoMode});
            Animated.timing(this.inputAreaOpacity, {toValue: 1, duration: 1500, useNativeDriver: true}).start();
        })
    }

    render()
    {
        return (
            <View style={style.container}>
                <View style={{flex: 0.15}} />
                <Image style={style.image} source={images.mainContent} />
                <InputArea info={this.state.infoMode} 
                    viewOpacity={this.inputAreaOpacity} 
                    onSubmit={() => this.fadeInputArea()}
                />

            </View>
        );
    }
    
}

class InputArea extends React.Component 
{ // props -- mode: str, opacity: num, onPress: fn (either animates and changes state + submits OR verifies + saves + next screen)
    constructor()
    {
        super();
        this.fields = { // not using state to prevent unneccesary rerendering
            name: '',
            email: '',
            code: null
        }
    }

    verifyEmail()
    {
        const email = this.fields.email.toLowerCase();
        return email.length < 1 || email.indexOf(domain) == email.length - domain.length;
    }

    handleSubmit()
    {
        this.props.onSubmit();
        // run code after
    }

    render()
    {
        if (this.props.info) return (
            <Animated.View style={[style.inputAreaContainer, {opacity: this.props.viewOpacity}]}>
                <View style={style.actionBox}>
                    <Text style={[style.fieldsTitle, {fontFamily: 'gilroy-bold'}]}>ABOUT YOU.</Text>
                    <Text style={[style.fieldsDescription, {fontFamily: 'gilroy', fontSize: 20}]}>
                        enter some basic details.
                    </Text>
                    <TextInputField text='first name' autocomplete='name' 
                                    onChangeText={(txt) => this.fields.name = txt}
                    />
                    <View style={{flex: 0.1}}/>
                    <TextInputField text='email' keyboard='email-address' autocomplete='email' 
                                    onChangeText={(txt) => this.fields.email = txt} 
                                    onEndEditing={() => this.forceUpdate()}
                    />
                    <Text style={[style.badEmailText, {color: this.verifyEmail() ? 'white' : 'red'}]}>
                        Please enter a valid email ending in '{domain}'.
                    </Text>
                </View>
                <View style={style.buttonBox} >
                    <RoundedButton text='submit' onPress={() => this.handleSubmit()} />
                </View>
            </Animated.View>
        );
        else return ( // in this case, the prop is 'verify'
            <Animated.View style={[style.inputAreaContainer, {opacity: this.props.viewOpacity}]}>
                <View style={style.actionBox}>
                    <Text style={[style.fieldsTitle, {fontFamily: 'gilroy-bold'}]}>VERIFICATION.</Text>
                    <Text style={[style.fieldsDescription, {fontFamily: 'gilroy', fontSize: 20}]}>
                        check your email for a code we sent you.
                    </Text>
                    <TextInputField text='verification code' autocomplete='off' keyboard='numeric'
                                    onChangeText={(txt) => this.fields.code = txt.replace(/\D/g,'')}
                    />
                </View>
                <View style={style.buttonBox} >
                    <RoundedButton text='verify.' onPress={() => this.handleSubmit()} />
                </View>
            </Animated.View>
        )
    }
}

export default Welcome;
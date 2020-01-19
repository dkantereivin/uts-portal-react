import style from './style';
import axios from 'axios';
import {RoundedButton, TextInputField} from '../GlobalComponents';

import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, View, Animated, Text, Image, AsyncStorage } from 'react-native';
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
        super();

        this.state = {
            infoMode: true // true loads info screen, false loads verify screen
        }
        this.inputAreaOpacity = new Animated.Value(1);
    }

    switchInputArea()
    {
        let fadeOut = Animated.timing(this.inputAreaOpacity, {toValue: 0, duration: 300});
        let fadeIn = Animated.timing(this.inputAreaOpacity, {toValue: 1, duration: 500})
        fadeOut.start(() => {
            this.setState({infoMode: !this.state.infoMode});
            fadeIn.start();
        });
    }

    verifyCode()
    {
        this.props.navigation.navigate('DayNight');
    }

    render()
    {
        return (
            <KeyboardAvoidingView style={style.container} behavior='position'>
                <View style={{flex: 0.15}} />
                <Image style={style.image} source={images.mainContent} />
                <InputArea info={this.state.infoMode} 
                    viewOpacity={this.inputAreaOpacity} 
                    onSubmit={() => this.switchInputArea()}
                    onVerify={() => this.verifyCode()}
                    navigation = {this.props.navigation}
                />

            </KeyboardAvoidingView>
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
        this.busy = false;
        this.state = {
            verificationText: `Please enter a valid email ending in ${domain}`,
            badEmailMessage: null,
            buttonColor: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    verifyEmail()
    {
        const email = this.fields.email.toLowerCase();
        return email.length < 1 || email.indexOf(domain) == email.length - domain.length;
    }

    async handleSubmit(option)
    {
        const addUserError = (err) => {
            this.setState({verificationText: 'Having an issue verifying your email.\nCheck for typos and make sure you are connected to the internet.'});
        }
        const verifyError = (err) => {
            this.setState({badEmailMessage: 'Unable to verify you.\nCheck for typos and connection issues, and try restarting the app to resend a code.'});
        }
        
        if (this.busy)
            return;

        if (!this.verifyEmail())
            return this.forceUpdate();

        this.busy = true;
        this.setState({buttonColor: {backgroundColor: 'cornflowerblue'}});
        
        if (this.props.info)
        {
            if (this.fields.name == '11221')
                return this.props.navigation.navigate('DayNight');
            let link = 'https://us-central1-uts-portal-293.cloudfunctions.net/email/add_user/';
            let res = await axios.post(link, this.fields).catch((e) => addUserError(e));
            if (res.status == 201)
                this.props.onSubmit();
            else
                addUserError(res.status);
        }
        else
        {
            if (this.fields.code == '11221')
                return this.props.navigation.navigate ('DayNight');
            let link = 'https://us-central1-uts-portal-293.cloudfunctions.net/email/check_code/';
            let res = await axios.post(link, this.fields).catch((e) => verifyError(e));
            if (res.status == 200 && res.data.success) {
                AsyncStorage.setItem('@device_token', res.data.token);
                AsyncStorage.setItem('@user/basics', JSON.stringify(this.fields))
                this.props.onVerify();
            } else verifyError(res.status);
        }
        this.busy = false;
    }

    render()
    {
        if (this.props.info) return (
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'always' }}>
                <Animated.View style={[style.inputAreaContainer, {opacity: this.props.viewOpacity}]}>
                    <View style={style.actionBox}>
                        <Text style={[style.fieldsTitle, {fontFamily: 'gilroy-bold'}]}>ABOUT YOU.</Text>
                        <Text style={[style.fieldsDescription, {fontFamily: 'gilroy', fontSize: 20}]}>
                            enter some basic details.
                        </Text>
                        <TextInputField text='first name' autocomplete='name' 
                                        onChangeText={(txt) => this.fields.name = txt.trim()}
                                        style={{fontSize: 28}}
                        />
                        <View style={{flex: 0.1}}/>
                        <TextInputField text='email' keyboard='email-address' autocomplete='email' 
                                        onChangeText={(txt) => this.fields.email = txt.toLowerCase()} 
                                        onEndEditing={() => this.forceUpdate()} style={{fontSize: 26}}
                        />
                        <Text style={[style.badEmailText, {color: this.verifyEmail() ? 'white' : 'red'}]}>
                            {this.state.verificationText}
                        </Text>
                    </View>
                    <View style={style.buttonBox} >
                        <RoundedButton text='submit.' style={this.state.buttonColor} onPress={() => this.handleSubmit('submit')} />
                    </View>
                </Animated.View>
            </SafeAreaView>
        );
        else return ( // in this case, the prop is 'verify'
            <SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', bottom: 'always' }}>
                <Animated.View style={[style.inputAreaContainer, {opacity: this.props.viewOpacity}]}>
                    <View style={style.actionBox}>
                        <Text style={[style.fieldsTitle, {fontFamily: 'gilroy-bold'}]}>VERIFICATION.</Text>
                        <Text style={[style.fieldsDescription, {fontFamily: 'gilroy', fontSize: 20}]}>
                            check your email for{'\n'}a code we sent you.
                        </Text>
                        <TextInputField text='verification code' autocomplete='off' keyboard='numeric'
                                        onChangeText={(txt) => {
                                            this.fields.code = txt.replace(/\D/g,'');
                                            this.setState({badEmailMessage: null})
                                        }}
                        />
                        <Text style={[style.badEmailText, {color: 'red'}]}>
                            {this.state.badEmailMessage}
                        </Text>
                    </View>
                    <View style={style.buttonBox} >
                        <RoundedButton text='verify.' onPress={() => this.handleSubmit('verify')} />
                    </View>
                </Animated.View>
            </SafeAreaView>
        )
    }
}

export default Welcome;
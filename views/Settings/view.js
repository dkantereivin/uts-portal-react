import React, {Component} from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from "./style";

const images = {
    back: require ('./assets/Back.png'),
    person: require('./assets/undraw_social_notifications_ro8o.png')
};

class Settings extends Component {
    constructor()
    {
        super();
        this.exit = this.exit.bind (this);
    }
    componentDidMount(){
        
    }
    exit(){
        this.props.navigation.navigate ('Home')
    }
    render() {
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>   
            <View style = {{flex: 1}}>
                <Image style = {style.person} source = {images.person} /> 
                <Text style = {style.MC}>
                    <Text style = {{fontFamily: "gilroy-bold"}}>
                    MAKING{'\n'}
                    </Text>
                    Changes.
                </Text>
                <Text style = {[style.General, style.WI]}>
                    <Text style = {{fontFamily: "gilroy-bold"}}>
                    WHAT ARE YOU{'\n'}
                    </Text>
                    INTO?
                </Text>
                <Text style = {[style.GE,style.General,style.Into]}>
                GENERAL
                </Text>
                <Text style = {[style.HO,style.General,style.Into]}>
                HOUSE
                </Text>
                <Text style = {[style.AR,style.General,style.Into]}>
                ARTICLES
                </Text>
                <Text style = {[style.SU,style.General,style.Into]}>
                SURVEYS
                </Text>
                <Text style= {[style.WW,style.General]}>
                    <Text style = {{fontFamily: "gilroy-bold"}}>
                    WHEN DO YOU{'\n'}
                    </Text>
                    WANT TO BE REMINDED?
                </Text>
                <Text style= {[style.General,style.NUM]}>
                    5
                </Text>
                <Text style= {[style.General,style.DB]}>
                    DAYS BEFORE
                </Text>
            
                <Text style = {[style.General, style.WT]}>
                    <Text style = {{fontFamily: "gilroy-bold"}}>
                    WHAT TIME DO YOU WANT{'\n'}
                    </Text>
                    TO BE NOTIFIED?
                </Text>
            </View>
        </ScrollView>
    );
  } 
}
export default Settings;
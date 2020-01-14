import React, {Component} from 'react';
import { View, ScrollView, Animated, StyleSheet, Image, Text, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Data from '../../Data'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from './style';
import Switch from '../../components/Switch';
import Slider from "react-native-slider"

const images = {
    back: require ('./assets/Back.png'),
    person: require('./assets/undraw_social_notifications_ro8o.png'),
    morning: require('./assets/Morning_Notification.png'),
    night: require('./assets/Night_Notification.png'),
    thumb: require('./assets/Ellipse 2.png')
};

class Settings extends Component {

    constructor()
    {
        super();
        this.exit = this.exit.bind (this);
        this.changenotif = this.changenotif.bind (this);
        this.state = {
            loaded: false,
            notifs: {}
        }
    }

    async componentDidMount(){
        let value = await Data.getNotification ();
        this.setState({notifs:value, loaded: true});
    }
    changenotif(key, newvalue){
        let newnotifs=this.state.notifs;
        newnotifs[key]=newvalue;
        this.setState({notifs: newnotifs});
        Data.setNotification(key,newvalue);
    }
    exit(){
        this.props.navigation.navigate ('Home')
    }
    render() {
        if (!this.state.loaded) {return <Text>{null}</Text>}
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>   
            <View style = {style.supercontainer}>
                <Image style = {style.person} source = {images.person} /> 
                <Text style = {style.MC}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                        MAKING{'\n'}
                    </Text>
                    Changes.
                </Text>
                <Text style = {[style.General, style.WI]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                        WHAT ARE YOU{'\n'}
                    </Text>
                    INTO?
                </Text>
                <Text style = {[style.General,style.List,style.GE]}>
                    GENERAL
                </Text>
                <Text style = {[style.General,style.List,style.HO]}>
                    HOUSE
                </Text>
                <Text style = {[style.General,style.List,style.AR]}>
                    ARTICLES
                </Text>
                <Text style = {[style.General,style.List,style.SU]}>
                    SURVEYS
                </Text>
                <Text style= {[style.General,style.WW]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                    WHEN DO YOU{'\n'}
                    </Text>
                    WANT TO BE REMINDED?
                </Text>
                <Text style= {style.NUM}>
                    {this.state.notifs['daysBefore']}
                </Text>
                <Text style= {[style.General,style.DB]}>
                    DAY{this.state.notifs['daysBefore']==1?'':'S'} BEFORE
                </Text>
                <Text style= {[style.General,style.DT]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                    DO YOU WANT{'\n'}
                    </Text>
                    TO HAVE SMART REMINDER ON?
                </Text>
                <Text style= {[style.General,style.WC]}>
                    We{'\''}ll remind you{' '}
                    <Text style = {{textDecorationLine: 'underline'}}>
                        what your next{'\n'}class is 5 minutes
                    </Text>
                    {' '}before it starts.
                </Text>
                <Text style = {[style.General,style.List,style.LS]}>
                    LATE START
                </Text>
                <Text style = {[style.General,style.List,style.AS]}>
                    ASSEMBLY
                </Text>
                <Text style = {[style.General,style.List,style.SS]}>
                    SPECIAL{'\n'}SCHEDULE
                </Text>
                <Text style = {[style.General,style.List,style.FD]}>
                    FLIP DAYS
                </Text>
                <Text style = {[style.General,style.WT]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                        WHAT TIME DO YOU WANT{'\n'}
                    </Text>
                    TO BE NOTIFIED?
                </Text>
                
                <View style={style.GESW}>
                    <Switch type={'general'} value = {this.state.notifs['general']}/>
                </View>
                <View style={style.HOSW}>
                    <Switch type={'house'} value = {this.state.notifs ['house']}/>
                </View>
                <View style={style.ARSW}>
                    <Switch type={'articles'} value = {this.state.notifs ['articles']}/>
                </View>
                <View style={style.SUSW}>
                    <Switch type={'surveys'} value = {this.state.notifs ['surveys']}/>
                </View>
                <View style={style.LSSW}>
                    <Switch type={'latestart'} value = {this.state.notifs ['latestart']}/>
                </View>
                <View style={style.ASSW}>
                    <Switch type={'assembly'} value = {this.state.notifs ['assembly']}/>
                </View>
                <View style={style.SSSW}>
                    <Switch type={'special'} value = {this.state.notifs ['special']}/>
                </View>
                <View style={style.FDSW}>
                    <Switch  type={'flipdays'} value = {this.state.notifs ['flipdays']}/>
                </View>
                <Slider style={style.slider} animated = {false} minimumValue={1} maximumValue={4} step={1} minimumTrackTintColor='#536DFE' thumbTintColor= '#536DFE' thumbStyle = {{width: wp (8), height: wp (8), borderRadius: wp (4)}}thumbTouchSize={{width: wp (100), height: wp (26)}} maximumTrackTintColor='#C8C8C8' value={this.state.notifs['daysBefore']} onValueChange={(days) => this.changenotif('daysBefore',days)}/>

                <View style = {style.morningview}>
                    <TouchableWithoutFeedback  onPress={() => this.changenotif('notifTime',1)}>
                        <Animated.Image style = {[style.morning,{opacity:this.state.notifs['notifTime']==1?1:0.25}]} source = {images.morning} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.nightview}>
                    <TouchableWithoutFeedback onPress={() => this.changenotif('notifTime',2)}>
                        <Animated.Image style = {[style.night,{opacity:this.state.notifs['notifTime']==2?1:0.25}]} source = {images.night} /> 
                    </TouchableWithoutFeedback>
                </View>
                <TouchableWithoutFeedback style={[style.backview]} onPress={() => this.exit()}>
                    <Image style = {style.back} source = {images.back} resizeMode = 'stretch'/>   
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
  } 
}
export default Settings;
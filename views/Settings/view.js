import React, {Component} from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Slider, AsyncStorage, TouchableOpacity, Switch } from 'react-native';
import Data from '../../Data'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from './style';

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
    }
    state = {
        notifs: {}
    };
    componentDidMount(){
        this.setState({notifs:Data.getNotification()});
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
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>   
            <View>
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
                <Switch style={style.GESW} onChange = {() => this.changenotif('general',!this.state.notifs['general'])} value = {this.state.notifs['general']}/>
                <Text style = {[style.General,style.List,style.HO]}>
                HOUSE
                </Text>
                <Switch style={style.HOSW} onChange = {() => this.changenotif('house',!this.state.notifs['house'])} value = {this.state.notifs['house']}/>
                <Text style = {[style.General,style.List,style.AR]}>
                ARTICLES
                </Text>
                <Switch style={style.ARSW} onChange = {() => this.changenotif('articles',!this.state.notifs['articles'])} value = {this.state.notifs['articles']}/>
                <Text style = {[style.General,style.List,style.SU]}>
                SURVEYS
                </Text>
                <Switch style={style.SUSW} onChange = {() => this.changenotif('surveys',!this.state.notifs['surveys'])} value = {this.state.notifs['surveys']}/>
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
                <Slider style={style.slider} minimumValue={0} maximumValue={7} step={1} minimumTrackTintColor='#536DFE' thumbTintColor='#536DFE' maximumTrackTintColor='#C8C8C8' value={this.state.notifs['daysBefore']} onValueChange={(days) => this.changenotif('daysBefore',days)}
                />
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
                <Switch style={style.LSSW} onChange = {() => this.changenotif('latestart',!this.state.notifs['latestart'])} value = {this.state.notifs['latestart']}/>
                <Text style = {[style.General,style.List,style.AS]}>
                ASSEMBLY
                </Text>
                <Switch style={style.ASSW} onChange = {() => this.changenotif('assembly',!this.state.notifs['assembly'])} value = {this.state.notifs['assembly']}/>
                <Text style = {[style.General,style.List,style.SS]}>
                SPECIAL{'\n'}SCHEDULE
                </Text>
                <Switch style={style.SSSW} onChange = {() => this.changenotif('special',!this.state.notifs['special'])} value = {this.state.notifs['special']}/>
                <Text style = {[style.General,style.List,style.FD]}>
                FLIP DAYS
                </Text>
                <Switch style={style.FDSW} onChange = {() => this.changenotif('flipdays',!this.state.notifs['flipdays'])} value = {this.state.notifs['flipdays']}/>
                <Text style = {[style.General,style.WT]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                    WHAT TIME DO YOU WANT{'\n'}
                    </Text>
                    TO BE NOTIFIED?
                </Text>
                <TouchableOpacity style={style.morningview} onPress={() => this.changenotif('notifTime',1)}>
                    <Image style = {[style.morning,{opacity:this.state.notifs['notifTime']==1?1:0.25}]} source = {images.morning} />
                </TouchableOpacity>
                <View style={style.nightview}>
                    <TouchableOpacity onPress={() => this.changenotif('notifTime',2)}>
                        <Image style = {[style.night,{opacity:this.state.notifs['notifTime']==2?1:0.25}]} source = {images.night} /> 
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[style.backview,{flex: 1}]} onPress={() => this.exit()}>
                    <Image style = {style.back} source = {images.back} />   
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
  } 
}
export default Settings;
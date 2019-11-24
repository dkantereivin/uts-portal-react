import React, {Component} from 'react';
import { View, ScrollView, StyleSheet, Image, Text, Slider, AsyncStorage, TouchableOpacity, Switch, Object } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import style from './style';

const images = {
    back: require ('./assets/Back.png'),
    person: require('./assets/undraw_social_notifications_ro8o.png'),
    morning: require('./assets/Morning_Notification.png'),
    night: require('./assets/Night_Notification.png'),
    thumb: require('./assets/Ellipse 2.png')
};
class notification extends Component{
   static async setNotification (key, newvalue) //string, value
    {
        try 
        {
            let curr = await AsyncStorage.getItem ('@user/notifSettings');
            let oldJSON = JSON.parse (curr);
            oldJSON [key] = newvalue;
            AsyncStorage.setItem ('@user/notifSettings', JSON.stringify(oldJSON));
        }
        catch (error)
        {
            console.log (error);
        }
    }

    static async setNotification (json) //json object
    {
        
        try {AsyncStorage.setItem ('@user/notifSettings', JSON.stringify (json));} catch (error) {console.log (error)}
    }

    static async getNotification ()
    {
        try {return JSON.parse(await AsyncStorage.getItem ('@user/notifSettings'));} catch (error) {console.log (error)}
        return null;
    }

    static async getNotification (key) //string
    {
        try {
            let curr = await AsyncStorage.getItem ('@user/notifSettings');
            let json = JSON.parse (curr);
            return json [key];
        }
        catch (error)
        {
            console.log (error);
        }
    }
}
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
        this.setState({notifs:notification.getNotification()})
        console.log(this.state.notifs['daysBefore'])
    }
    changenotif(key, newvalue){
        let newnotifs=this.state.notifs;
        newnotifs[key]=newvalue;
        this.setState({notifs: newnotifs});
        notification.setNotification(key,newvalue);
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
                <Switch style={style.GESW} onChange = {() => { this.setState({ general: !this.state.general })}} value = {this.state.general}/>
                <Text style = {[style.General,style.List,style.HO]}>
                HOUSE
                </Text>
                <Switch style={style.HOSW} onChange = {() => { this.setState({ house: !this.state.house })}} value = {this.state.house}/>
                <Text style = {[style.General,style.List,style.AR]}>
                ARTICLES
                </Text>
                <Switch style={style.ARSW} onChange = {() => { this.setState({ articles: !this.state.articles })}} value = {this.state.articles}/>
                <Text style = {[style.General,style.List,style.SU]}>
                SURVEYS
                </Text>
                <Switch style={style.SUSW} onChange = {() => { this.setState({ surveys: !this.state.surveys })}} value = {this.state.surveys}/>
                <Text style= {[style.General,style.WW]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                    WHEN DO YOU{'\n'}
                    </Text>
                    WANT TO BE REMINDED?
                </Text>
                <Text style= {style.NUM}>
                    {this.state.days}
                </Text>
                <Text style= {[style.General,style.DB]}>
                    DAY{this.state.days==1?'':'S'} BEFORE
                </Text>
                <Slider style={style.slider} minimumValue={0} maximumValue={7} step={1} minimumTrackTintColor='#536DFE' thumbTintColor='#536DFE' maximumTrackTintColor='#C8C8C8' value={this.state.days} onValueChange={days => this.setState({ days })}
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
                <Switch style={style.LSSW} onChange = {() => { this.setState({ late_start: !this.state.late_start })}} value = {this.state.late_start}/>
                <Text style = {[style.General,style.List,style.AS]}>
                ASSEMBLY
                </Text>
                <Switch style={style.ASSW} onChange = {() => { this.setState({ assembly: !this.state.assembly })}} value = {this.state.assembly}/>
                <Text style = {[style.General,style.List,style.SS]}>
                SPECIAL{'\n'}SCHEDULE
                </Text>
                <Switch style={style.SSSW} onChange = {() => { this.setState({ special_schedule: !this.state.special_schedule })}} value = {this.state.special_schedule}/>
                <Text style = {[style.General,style.List,style.FD]}>
                FLIP DAYS
                </Text>
                <Switch style={style.FDSW} onChange = {() => { this.setState({ flip_days: !this.state.flip_days })}} value = {this.state.flip_days}/>
                <Text style = {[style.General,style.WT]}>
                    <Text style = {{fontFamily: 'gilroy-bold'}}>
                    WHAT TIME DO YOU WANT{'\n'}
                    </Text>
                    TO BE NOTIFIED?
                </Text>
                <TouchableOpacity style={style.morningview} onPress={() => { this.setState({ morningnight: 'morning' })}}>
                    <Image style = {[style.morning,{opacity:this.state.morningnight==='morning'?1:0.25}]} source = {images.morning} />
                </TouchableOpacity>
                <View style={style.nightview}>
                    <TouchableOpacity onPress={() => { this.setState({ morningnight: 'night' })}}>
                        <Image style = {[style.night,{opacity:this.state.morningnight==='night'?1:0.25}]} source = {images.night} /> 
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
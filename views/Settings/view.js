import React, {Component} from 'react';
import { View, ScrollView, Animated, StyleSheet, Image, Text, Slider, AsyncStorage, TouchableOpacity, Switch } from 'react-native';
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
                <TouchableOpacity style={style.morningview} onPress={() => this.changenotif('notifTime',1)}>
                    <Animated.Image style = {[style.morning,{opacity:this.state.notifs['notifTime']==1?1:0.25}]} source = {images.morning} />
                </TouchableOpacity>
                <View style={style.nightview}>
                    <TouchableOpacity onPress={() => this.changenotif('notifTime',2)}>
                        <Animated.Image style = {[style.night,{opacity:this.state.notifs['notifTime']==2?1:0.25}]} source = {images.night} /> 
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[style.backview]} onPress={() => this.exit()}>
                    <Image style = {style.back} source = {images.back} />   
                </TouchableOpacity>
                <Switch style={style.GESW} onValueChange = {(value) => this.changenotif ('general',value)} value = {this.state.notifs['general']} />
                <Switch style={style.HOSW} onValueChange = {(value) => this.changenotif('house',value)} value = {this.state.notifs['house']}/>
                <Switch style={style.ARSW} onValueChange = {(value) => this.changenotif('articles',value)} value = {this.state.notifs['articles']}/>
                <Switch style={style.SUSW} onValueChange = {(value) => this.changenotif('surveys',value)} value = {this.state.notifs['surveys']}/>
                <Slider style={style.slider} disabled = {false} minimumValue={0} maximumValue={7} step={1} minimumTrackTintColor='#536DFE' thumbTintColor='#536DFE' maximumTrackTintColor='#C8C8C8' value={this.state.notifs['daysBefore']} onValueChange={(days) => this.changenotif('daysBefore',days)}/>
                <Switch style={style.LSSW} onValueChange = {(value) => this.changenotif('latestart',value)} value = {this.state.notifs['latestart']}/>
                <Switch style={style.ASSW} onValueChange = {(value) => this.changenotif('assembly',value)} value = {this.state.notifs['assembly']}/>
                <Switch style={style.SSSW} onValueChange = {(value) => this.changenotif('special',value)} value = {this.state.notifs['special']}/>
                <Switch style={style.FDSW} onValueChange = {(value) => this.changenotif('flipdays',value)} value = {this.state.notifs['flipdays']}/>
            </View>
        </ScrollView>
    );
  } 
}
export default Settings;
import React, {Component} from 'react';
import {Animated, StyleSheet, View, Image, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {widthPercentageToDP as wp, 
    heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = StyleSheet.create({
    navbar: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: wp (100),
        height: wp (13),
        backgroundColor: 'white',
        borderTopWidth: wp(1/375.0*100),
        borderTopColor: 'rgb(224,224,224)',
        //flexDirection: 'row',
        //justifyContent: 'space-evenly'
    },
    button: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 0,
        top: 0,
        width: wp (93.75/375.0*100),
        height: wp (13),
    },
    underline: {
        position: 'absolute',
        backgroundColor: '#003057',
        top: wp (39/375.0*100),
        left: wp (0),
        width: wp (22/375.0*100),
        height: wp (2/375.0*100),
    },
    home: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (0/375.0*100),
        left: wp (0/375.0*100),
        width: wp(93.75/375.0*100),
        height: wp (13),
    },
    schedule: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (0/375.0*100),
        left: wp (93.75/375.0*100),
        width: wp(93.75/375.0*100),
        height: wp (13),
    },
    articles: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (0/375.0*100),
        left: wp (187.5/375.0*100),
        width: wp(93.75/375.0*100),
        height: wp (13),
    },
    settings: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (0/375.0*100),
        left: wp (281.25/375.0*100),
        width: wp(93.75/375.0*100),
        height: wp (13),
    },
    homeicon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (12.5/375.0*100),
        left: wp (55.8/375.0*100),
        width: wp (28.5/375.0*100),
        height: wp (28.5/375.0*100)
    },
    schedulesicon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (14/375.0*100),
        left: wp (41.85/375.0*100),
        width: wp(24/375.0*100),
        height: wp(24/375.0*100),
    },
    articlesicon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (14/375.0*100),
        left: wp (27.9/375.0*100),
        width: wp(24/375.0*100),
        height: wp(24/375.0*100),
    },
    settingsicon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        top: wp (14/375.0*100),
        left: wp (13.95/375.0*100),
        width: wp(24/375.0*100),
        height: wp(24/375.0*100),
    }
});

class Navbar extends Component
{
    animation = new Animated.Value(0);

    static navigationOptions = {
        gesturesEnabled: false,
        swipeEnabled: false,
    };

    constructor (props)
    {
        super(props);
        this.homeBarPress = this.homeBarPress.bind(this);
        this.scheduleBarPress = this.scheduleBarPress.bind(this);
        this.articlesBarPress = this.articlesBarPress.bind(this);
        this.settingsBarPress = this.settingsBarPress.bind(this);
    }

    homeBarPress()//gets called on load for some random reason
    {
        if (this.props.navigation.state.routeName !== 'Home')
        {
            this.props.navigation.navigate('Home');
            Animated.timing (this.animation, {
                toValue: 0,
                duration: 300,
                //easing: Easing.inOut (Easing.ease),
            }).start()
        }
    }

    scheduleBarPress() 
    {
        if (this.props.navigation.state.routName !== 'Schedule')
        {
            this.props.navigation.navigate('Schedule');
            Animated.timing (this.animation, {
                toValue: 1,
                duration: 300,
            }).start()
        }
    }

    articlesBarPress() 
    {
        if (this.props.navigation.state.routName !== 'Articles')
        {
            this.props.navigation.navigate('Articles');
            Animated.timing (this.animation, {
                toValue: 2,
                duration: 300,
            }).start()
        }
    }

    settingsBarPress()
    {
        if (this.props.navigation.state.routName !== 'Settings')
        {
            this.props.navigation.navigate('Settings');
            Animated.timing (this.animation, {
                toValue: 3,
                duration: 300,
            }).start()
        }
    }

    render()
    {
        
        const homeBarTranslate = this.animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [-wp(7/375.0*100), 0, 0, 0],
        })
        const scheduleBarTranslate = this.animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0, -wp(7/375.0*100), 0, 0]
        })
        const articlesBarTranslate = this.animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0, 0, -wp(7/375.0*100), 0]
        })
        const settingsBarTranslate = this.animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [0, 0, 0, -wp(7/375.0*100)]
        })
        const underlineTranslate = this.animation.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: [wp(57.4/375.0*100), wp(136.8/375.0*100), wp(216.2/375.0*100), wp(295.6/375.0*100)]
        })

        return (
            <View style={style.navbar}>
                <Animated.View style = {[style.home, {transform: [{translateY: homeBarTranslate}]}]}>
                    <NavbarButton icon={'home'} onPress={() => this.homeBarPress()}/>
                </Animated.View>
                <Animated.View style = {[style.schedule,{transform: [{translateY: scheduleBarTranslate}]}]}>
                    <NavbarButton icon={'schedule'} onPress={()=>this.scheduleBarPress()}/>
                </Animated.View>
                <Animated.View style = {[style.articles, {transform: [{translateY: articlesBarTranslate}]}]}>
                    <NavbarButton icon={'articles'} onPress={()=>this.articlesBarPress()}/>
                </Animated.View>
                <Animated.View style = {[style.settings, {transform: [{translateY: settingsBarTranslate}]}]}>
                    <NavbarButton icon={'settings'} onPress={()=>this.settingsBarPress()}/>
                </Animated.View>
                <Animated.View style = {[style.underline, {transform: [{translateX: underlineTranslate}]}]}/>
            </View>
        )
    }
}


class NavbarButton extends Component
{
    iconstyle = {};

    constructor(props)
    {
        super(props);
        this.state = {icon: null}
        if (this.props.icon == 'home') this.iconstyle = style.homeicon;
        else if (this.props.icon == 'schedule') this.iconstyle = style.schedulesicon;
        else if (this.props.icon == 'articles') this.iconstyle = style.articlesicon;
        else if (this.props.icon == 'settings') this.iconstyle = style.settingsicon;
    }
    
    componentWillMount()
    {
        let icon;
        switch (this.props.icon)
        {
            case 'home':        icon = require('./navbar_assets/home.png');
                                break;
            case 'schedule':    icon = require('./navbar_assets/schedule.png');
                                break;
            case 'articles':    icon = require('./navbar_assets/articles.png');
                                break; 
            case 'settings':    icon = require('./navbar_assets/settings.png');
                                break;    
            default:            throw new Error("Navbar Button props.icon is invalid.")     
        }
        this.state.icon = icon;
        this.forceUpdate();
    }
    
    /**
     * 
     * @param {object} props {icon, onPress}
     */
    render()
    {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={style.button}>
                    <Image style={this.iconstyle} source={this.state.icon}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default Navbar;

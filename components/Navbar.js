import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {widthPercentageToDP as wp, 
    heightPercentageToDP as hp} from 'react-native-responsive-screen'
const style = StyleSheet.create({
    navbar: {
        flex: 0.06,
        flexDirection: 'row',  
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.20
    },
    iconImg: {
        width: 20,
        height: 20
    }
});

class Navbar extends Component
{
    homeBarPress()//gets called on load for some random reason
    {
        if (this.props.navigation.state.routeName !== 'Home')
            this.props.navigation.navigation('Home');
            
    }

    render()
    {
        return (
            <View style={style.navbar}>
                <NavbarButton icon={'home'} onPress={this.homeBarPress.bind(this)}/>
                <NavbarButton icon={'schedule'} onPress={()=>this.props.navigation.navigate('Schedule')}/>
                {/* <NavbarButton icon={'articles'} onPress={()=>this.props.navigation.navigate('Articles')}/> */}
                <NavbarButton icon={'settings'} onPress={()=>this.props.navigation.navigate('Settings')}/>
            </View>
        )
    }
}


class NavbarButton extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {icon: null}
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
            <TouchableHighlight style={style.button} onPress={this.props.onPress} underlayColor='gainsboro'>
                <Image style={style.iconImg} source={this.state.icon} />
            </TouchableHighlight>
        )
    }
}

export default Navbar;

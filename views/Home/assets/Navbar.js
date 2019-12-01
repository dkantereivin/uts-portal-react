import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';

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
    render()
    {
        return (
            <View style={style.navbar}>
                <NavbarButton icon={'home'} onPress={() => this.props.navigation.popToTop()}/>
                <NavbarButton icon={'schedule'} onPress={()=>this.props.navigation.navigate('Schedule')}/>
                <NavbarButton icon={'articles'} onPress={()=>this.props.navigation.navigate('Articles')}/>
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
            case 'home':        icon = require('./home.png');
                                break;
            case 'schedule':    icon = require('./schedule.png');
                                break;
            case 'articles':    icon = require('./articles.png');
                                break; 
            case 'settings':    icon = require('./settings.png');
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
            <TouchableHighlight style={style.button} onPress={this.props.onPress}>
                <Image style={style.iconImg} source={this.state.icon} />
            </TouchableHighlight>
        )
    }
}

export default Navbar;

import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    navbar: {
        // backgroundColor: 'black',
        flex: 0.06,
        flexDirection: 'row',  
        justifyContent: 'space-evenly'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
        flex: 0.20
    },
    iconImg: {
        width: 10,
        height: 10,
        flex: 1
    }
});

class Navbar extends Component
{
    render()
    {
        return (
            <View style={style.navbar}>
                <NavbarButton icon={'home'} onPress={() => console.log("Test")}/>
                <NavbarButton icon={'time'} onPress={() => console.log("Test")}/>
                <NavbarButton icon={'articles'} onPress={() => console.log("Test")}/>
                <NavbarButton icon={'settings'} onPress={() => console.log("Test")}/>
            </View>
        )
    }
}


class NavbarButton extends Component
{
    constructor(props)
    {
        super(props);

        let icon;
        switch (props.icon)
        {
            case 'home':        icon = require('./home.png');
                                break;
            case 'time':        icon = require('./time.png');
                                break;
            case 'articles':    icon = require('./articles.png');
                                break; 
            case 'settings':    icon = require('./settings.png');
                                break;    
            default:            throw new Error("Navbar Button props.icon is invalid.")     
        }
        this.props.icon = icon;
    }
    
    /**
     * 
     * @param {object} props {icon, onPress}
     */
    render()
    {
        return (
            <TouchableHighlight style={style.button} onPress={this.props.onPress}>
                <Image style={style.iconImg} source={this.props.icon} />
            </TouchableHighlight>
        )
    }
}

export default Navbar;

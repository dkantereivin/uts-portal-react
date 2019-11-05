import {View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    navbar: {
        position: 'absolute',
        left: 0, right: 0,
        bottom: 0,
        height: hp(6.7),
        backgroundColor: 0x000000
    },
    buttonCollection: {
        backgroundColor: 'transparent'
    },
    button: {
        height: hp(6.5),
        width: wp(20.8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconImg: {
        width: null,
        height: null,
        flex: 0.8
    }
});

const imgPath = "../assets/"
const icons = {
    home: imgPath + 'home',
    time: imgPath + 'time',
    articles: imgPath + 'articles',
    settings: imgPath + 'settings'
};

class Navbar extends React.Component
{
    render()
    {
        return (
            <View style={style.navbar}>
                {/*Here, include buttons with props: callbackFunc that change the view of the Dashboard view*/}
            </View>
        )
    }
}


class NavbarButton extends React.Component
{
    /**
     * 
     * @param {object} props {icon, onPress}
     */
    render(props)
    {
        <TouchableHighlight style={style.button} onPress={props.onPress}>
            <Image style={style.iconImg} source={require(iconPath)} />
        </TouchableHighlight>
    }
}

export default Navbar;


// class ButtonCollection extends React.Component
// {
//     render()
//     {
//         <View style={style.buttonCollection}>
//             <NavbarButton
//         </View>
//     }
// }
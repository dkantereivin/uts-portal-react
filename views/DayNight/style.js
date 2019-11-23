import { StyleSheet } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    container: {
        flex: 1
    },
    nightButton: {
        flex: 0.4025
    },
    textBox: {
        flex: 0.165,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayButton: {
        flex: 0.4325
    },
    nightImg: {
        position: 'absolute',
        width: wp(140), // 3.5x height
        height: hp(40),
        top: 0,
        left: wp(3)
    },
    dayImg: {
        position: 'absolute',
        width: wp(120), // 2.75x height
        height: hp(43.5),
        bottom: 0,
        right: wp(3)
    },
    text: {
        fontFamily: 'montserrat-bold',
        fontSize: 32,
        color: 'black'
    }
}

export default StyleSheet.create (style);
import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    sad: {
        position: 'absolute',
        top: wp(40),
        left: wp (25),
        width: wp (50),
        height: wp (50),
    },
    comingsoon: {
        position: 'absolute',
        fontFamily: 'gilroy-bold',
        fontSize: wp (20/375.0*100),
        top: wp (100),
        left: wp (10),
        width: wp (80),
    }
}

export default StyleSheet.create (style);
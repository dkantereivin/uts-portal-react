import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { white } from 'ansi-colors';

const style = {
    whatsup: {
        fontFamily: 'gilroy-bold',
        fontSize: wp (30/375.0*100),
        position: 'absolute',
        color: 'black',
        top: hp (54/812.0*100),
        left: wp (34/375.0*100),
        width: wp (165/375.0*100),
    }
}

export default StyleSheet.create (style);
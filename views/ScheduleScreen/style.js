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
    },
    contentContainerStyle: {
        position: 'absolute',
        top: 0,
        height: hp (100),
        width: wp (500),
        left: 0,
    },
    itemStyle: {
        top: 0,
        marginHorizontal: wp(20/375.0*100), 
        backgroundColor: 'black', 
        width: wp (100-40/375.0*100),
        height: hp (100),
    }
}

export default StyleSheet.create (style);
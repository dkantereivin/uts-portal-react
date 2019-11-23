import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { white } from 'ansi-colors';

const style = {
    clouds: {
        position: 'absolute',
        top: -hp(240/812.0*100),
        left: -wp(100/375.0*100),
        width: wp (675/375.0*100),
        height: hp (500/812.0*100),
    },
    dream: {
        position: 'absolute',
        top: hp (505/812.0*100),
        left: -wp (102/375.0*100),
        width: wp (556/375.0*100),
        height: hp (373/812.0*100),
    },
    openButton: {
        borderRadius: wp (14.75/375.0*100),
        backgroundColor: '#536DFE',
        position: 'absolute',
        top: hp (438/812.0*100),
        left: wp (30/375.0*100),
        width: wp (315/375.0*100),
        height: hp (61/812.0*100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    openText: {
        position: 'absolute',
        fontFamily: 'montserrat',
        fontSize: wp (24/375.0*100),
        color: 'white',
    },
    title: {
        position: 'absolute',
        fontFamily: 'gilroy-bold',
        fontSize: wp (30/375.0*100),
        color: 'black',
        top: hp (278/812.0*100),
        left: wp (30/375.0*100),
        width: wp (303/375.0*100),
    },
    subtitle: {
        position: 'absolute',
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
        color: 'black',
        top: hp (358/812.0*100),
        left: wp (30/375.0*100),
        width: wp (277/375.0*100),
    }
}

export default StyleSheet.create (style);
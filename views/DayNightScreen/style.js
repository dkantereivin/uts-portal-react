import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    bigView: {
        flex: 1, 
        flexDirection: 'column',
    },
    dayPressed: {        
        width: wp (519/375.0*100),
        height: hp (408.5/812.0*100),
        position: 'absolute',
        bottom: hp (0),
        left: wp (-151/375.0*100),
    },
    dayImage: {
        width: wp (519/375.0*100),
        height: hp (408.5/812.0*100),
        position: 'absolute',
        bottom: 0,
        top: 0,
    },
    nightPressed: {
        width: wp (141.6),
        height: hp (40.64),
        position: 'absolute',
        top: hp (7.64),
        left: wp (2.4),
    },
    nightImage: {
        width: wp (531.0/375.0*100),
        height: hp (330.0/812.0*100),
        position: 'absolute',
        top: 0,
        right: 0,
    },
    orText: {
        fontSize: wp(30/375.0*100),
        color: 'black',
        height: hp (37/375.0*100),
        width: wp (50/375.0*100),
        left: wp (163/375.0*100),
        fontFamily: 'montserrat-bold',
        top: hp (374/812.0*100),
    },
}

export default StyleSheet.create (style);
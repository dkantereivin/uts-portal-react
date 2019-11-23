import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { white } from 'ansi-colors';

const style = {
    sadwoman: {
        position: 'absolute',
        top: hp (439/812.0*100),
        left: -wp (110/375.0*100),
        width: wp (680/375.0*100),
        height: hp (418/812.0*100),
    },
    tuesdayLabel: {
        position: 'absolute',
        top: hp (143/812.0*100),
        left: wp (36/375.0*100),
        width: wp (303/375.0*100),
        fontFamily: 'gilroy-bold',
        fontSize: wp (30/375.0*100),
        color: 'black',
    },
    stackView: {
        position: 'absolute',
        top: hp (195/812.0*100),
        left: wp (42/375.0*100),
        width: wp (265/375.0*100),
        height: hp (275.0/812.0*100),
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 2,
        fontSize: hp (30/812.0*100),
        fontFamily: 'gilroy',
        color: 'black',
    },
    nextButton: {
        borderRadius: wp (14.75/375.0*100),
        backgroundColor: '#536DFE',
        position: 'absolute',
        top: hp (504/812.0*100),
        left: wp (82.5/375.0*100),
        width: wp (226/375.0*100),
        height: hp (59/812.0*100),
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextText: {
        fontFamily: 'montserrat',
        fontSize: wp (24/375.0*100),
        color: 'white',
    }
}

export default StyleSheet.create (style);
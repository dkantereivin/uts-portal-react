import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
const style = {
    person: {
        position: 'absolute',
        left: wp(167/375.0*100),
        top: wp(60/375.0*100),
        width: wp(236/375.0*100),
        height: wp(192.29/375.0*100)
    },
    General: {
        position: 'absolute',
        color: "#000",
        fontFamily: "gilroy",
        fontSize: wp(18/375.0*100),
        letterSpacing: wp(0.5/375.0*100),
        lineHeight: wp(22/375.0*100)
    },
    MC: {
        position: 'absolute',
        left: wp(30/375.0*100),
        top: wp(95/375.0*100),
        width: wp(153/375.0*100),
        height: wp(72/375.0*100),
        color: "#000",
        fontFamily: "gilroy",
        fontSize: wp(30/375.0*100),
        letterSpacing: wp(0.83/375.0*100),
        lineHeight: wp(35/375.0*100)
    },
    WI: {
        left: wp(30/375.0*100),
        top: wp(201/375.0*100),
        width: wp(135/375.0*100),
        height: wp(43/375.0*100)
    },
    Into: {
        fontFamily: "gilroy-bold",
        left: wp(30/375.0*100),
        height: wp(22/375.0*100)
    },
    GE: {
        top: wp(265/375.0*100),
        width: wp(81/375.0*100),
    },
    HO: {
        top: wp(312/375.0*100),
        width: wp(61/375.0*100),
    },
    AR: {
        top: wp(357/375.0*100),
        width: wp(84/375.0*100),
    },
    SU: {
        top: wp(402/375.0*100),
        width: wp(80/375.0*100),
    },
    WW: {
        left: wp(30/375.0*100),
        top: wp(465/375.0*100),
        width: wp(216/375.0*100),
        height: wp(43/375.0*100)
    },
    NUM: {
        fontFamily: "gilroy-bold",
        left: wp(98/375.0*100),
        top: wp(531/375.0*100),
        width: wp(24/375.0*100),
        height: wp(49/375.0*100),
        fontSize: wp(40/375.0*100),
        letterSpacing: wp(1.1/375.0*100),
        lineHeight: wp(49/375.0*100)
    },
    DB: {
        left: wp(138/375.0*100),
        top: wp(545/375.0*100),
        width: wp(119/375.0*100),
        height: wp(21/375.0*100)
    },
    WT: {
        left: wp(29/375.0*100),
        top: wp(988/375.0*100),
        width: wp(233/375.0*100),
        height: wp(43/375.0*100)
    }
}
export default StyleSheet.create (style);
import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
const style = {
    person: {
        position: 'absolute',
        left: wp(167/375.0*100),
        top: 0,
        width: wp(236/375.0*100),
        height: wp(192.29/375.0*100)
    },
    General: {
        position: 'absolute',
        color: '#000',
        fontFamily: 'gilroy',
        fontSize: wp(18/375.0*100),
        letterSpacing: wp(0.5/375.0*100),
        lineHeight: wp(22/375.0*100)
    },
    MC: {
        position: 'absolute',
        left: wp(30/375.0*100),
        top: wp(35/375.0*100),
        color: '#000',
        fontFamily: 'gilroy',
        fontSize: wp(30/375.0*100),
        letterSpacing: wp(0.83/375.0*100),
        lineHeight: wp(35/375.0*100)
    },
    WI: {
        left: wp(30/375.0*100),
        top: wp(141/375.0*100),
    },
    List: {
        fontFamily: 'gilroy-bold',
        left: wp(30/375.0*100),
    },
    GE: {
        top: wp(205/375.0*100),
    },
    GESW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(202/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    HO: {
        top: wp(252/375.0*100),
    },
    HOSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(245/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    AR: {
        top: wp(297/375.0*100),
    },
    ARSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(294/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    SU: {
        top: wp(342/375.0*100),
    },
    SUSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(339/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    WW: {
        left: wp(30/375.0*100),
        top: wp(405/375.0*100),
    },
    NUM: {
        position: 'absolute',
        fontFamily: 'gilroy-bold',
        left: wp(98/375.0*100),
        top: wp(471/375.0*100),
        fontSize: wp(40/375.0*100),
        letterSpacing: wp(1.1/375.0*100),
        lineHeight: wp(49/375.0*100),
    },
    DB: {
        left: wp(138/375.0*100),
        top: wp(485/375.0*100),
    },
    slider: {
        position: 'absolute',
        left: wp(31.02/375.0*100),
        top: wp(536/375.0*100),
        width: wp(313.98/375.0*100),
        height: wp(7/375.0*100)
    },
    DT: {
        left: wp(28/375.0*100),
        top: wp(587/375.0*100),
    },
    WC: {
        left: wp(31/375.0*100),
        top: wp(645/375.0*100),
    },
    LS: {
        top: wp(716/375.0*100),
    },
    LSSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(716/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    AS: {
        top: wp(763/375.0*100),
    },
    ASSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(759/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    SS: {
        top: wp(804/375.0*100),
    },
    SSSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(808/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    FD: {
        top: wp(863/375.0*100),
    },
    FDSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(856/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    WT: {
        position: 'absolute',
        left: wp(29/375.0*100),
        top: wp(928/375.0*100)
    },
    morningview: {
        position: 'absolute',
        left: wp(-56/375.0*100),
        top: wp(996/375.0*100),
    },
    morning: {
        width: wp(232.01/375.0*100),
        height: wp(189.19/375.0*100)
    },
    nightview: {
        position: 'absolute',
        left: wp(193/375.0*100),
        top: wp(1005/375.0*100),
    },
    night: {
        width: wp(226.92/375.0*100),
        height: wp(152.83/375.0*100)
    },
    supercontainer: {
        width: wp (100), 
        height: wp (1280/375.0*100),
    }
}
export default StyleSheet.create (style);
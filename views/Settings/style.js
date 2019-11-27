import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'
const style = {
    backview: {
        position: 'absolute',
        left: wp(25/375.0*100),
        top: wp(25/375.0*100),
    },
    back: {
        width: wp(40/375.0*100),
        height: wp(40/375.0*100)
    },
    person: {
        position: 'absolute',
        left: wp(167/375.0*100),
        top: wp(60/375.0*100),
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
        paddingLeft: wp(30/375.0*100),
        paddingTop: wp(95/375.0*100),
        color: '#000',
        fontFamily: 'gilroy',
        fontSize: wp(30/375.0*100),
        letterSpacing: wp(0.83/375.0*100),
        lineHeight: wp(35/375.0*100)
    },
    WI: {
        paddingLeft: wp(30/375.0*100),
        paddingTop: wp(201/375.0*100),
    },
    List: {
        fontFamily: 'gilroy-bold',
        paddingLeft: wp(30/375.0*100),
    },
    GE: {
        paddingTop: wp(265/375.0*100),
    },
    GESW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(262/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    HO: {
        paddingTop: wp(312/375.0*100),
    },
    HOSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(305/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    AR: {
        paddingTop: wp(357/375.0*100),
    },
    ARSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(354/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    SU: {
        paddingTop: wp(402/375.0*100),
    },
    SUSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(399/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    WW: {
        paddingLeft: wp(30/375.0*100),
        paddingTop: wp(465/375.0*100),
    },
    NUM: {
        position: 'absolute',
        fontFamily: 'gilroy-bold',
        paddingLeft: wp(98/375.0*100),
        paddingTop: wp(531/375.0*100),
        fontSize: wp(40/375.0*100),
        letterSpacing: wp(1.1/375.0*100),
        lineHeight: wp(49/375.0*100),
    },
    DB: {
        paddingLeft: wp(138/375.0*100),
        paddingTop: wp(545/375.0*100),
    },
    slider: {
        position: 'absolute',
        left: wp(31.02/375.0*100),
        top: wp(596/375.0*100),
        width: wp(313.98/375.0*100),
        height: wp(7/375.0*100)
    },
    DT: {
        paddingLeft: wp(28/375.0*100),
        paddingTop: wp(647/375.0*100),
    },
    WC: {
        paddingLeft: wp(31/375.0*100),
        paddingTop: wp(705/375.0*100),
    },
    LS: {
        paddingTop: wp(776/375.0*100),
    },
    LSSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(776/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    AS: {
        paddingTop: wp(823/375.0*100),
    },
    ASSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(819/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    SS: {
        paddingTop: wp(864/375.0*100),
    },
    SSSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(868/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    FD: {
        paddingTop: wp(923/375.0*100),
    },
    FDSW:{
        position: 'absolute',
        left: wp(269/375.0*100),
        top: wp(916/375.0*100),
        width: wp(54/375.0*100),
        height: wp(29/375.0*100)
    },
    WT: {
        paddingLeft: wp(29/375.0*100),
        paddingTop: wp(988/375.0*100)
    },
    morningview: {
        position: 'absolute',
        left: wp(-56/375.0*100),
        top: wp(1056/375.0*100),
    },
    morning: {
        width: wp(232.01/375.0*100),
        height: wp(189.19/375.0*100)
    },
    nightview: {
        paddingLeft: wp(193/375.0*100),
        paddingTop: wp((1065-152.83)/375.0*100),
    },
    night: {
        width: wp(226.92/375.0*100),
        height: wp(152.83/375.0*100)
    }
}
export default StyleSheet.create (style);
import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    superContainer: {
        flex: 1
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp (100),
        height: hp (94),
    },
    containerContent: {
        paddingLeft: 0,
        paddingRight: 0,
        height: wp (870/375.0*100),
    },
    helloMsg: {
        position: 'absolute',
        top: wp (68/375.0*100),
        left: wp (30/375.0*100),
        width: wp (80),
        fontSize: wp (30/375.0*100),
        fontFamily: 'gilroy-bold'
    },
    firstName: {
        fontSize: wp (30/375.0*100),
        fontFamily: 'gilroy',
    },
    stdText: {
        position: 'absolute',
        top: wp (159/375.0*100),
        left: wp(30/375.0*100),
        width: wp (30),
        fontSize: wp(18/375.0*100),
        fontFamily: 'gilroy'
    },
    clock: {
        position: 'absolute',
        top: wp (177/375.0*100),
        left: wp (30/375.0*100),
        width: wp (300/375.0*100),
        fontSize: wp(45/375.0*100),
        fontFamily: 'gilroy'
    },
    nextclassname: {
        position : 'absolute',
        fontFamily: 'gilroy-bold', 
        fontSize: wp (18/375.0*100),
        left: wp (195.0/375.0*100),
        top: wp (178/375.0*100),
        width: wp ((60 + 111)/375.0*100)
    },
    isnext: {
        position: 'absolute',
        fontFamily: 'gilroy', 
        fontSize: wp (18/375.0*100),
    },
    restofdaylabel: {
        position: 'absolute',
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
        left: wp (30/375.0*100),
        top: wp (255/375.0*100),
    },
    restOfDayBox: {
        position: 'absolute',
        left: wp (16/375.0*100),
        right: wp (16/375.0*100),
        top: wp (277/375.0*100),
        height: wp (165/375.0*100),
        backgroundColor: 'rgba(242,242,242,1)',
    },
    restofdayscroll: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    restofdaycontent: {
        paddingLeft: 0,
        paddingRight: 0,
    },
    nothinglefttext: {
        top: wp (72/375.0*100),
        alignSelf: 'center',
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
    },
    upcomingDayBox: {
        position: 'absolute',
        left: wp (16/375.0*100),
        right: wp (16/375.0*100),
        top: wp (470/375.0*100),
        height: wp (100/375.0*100),
    },
    periodcontainer: {
        left: 0,
        right: 0,
        height: wp (55/375.0*100),
    },
    periodtimelabel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
        left: wp (25/375.0*100),
        top: wp (17/375.0*100),
    },
    periodclasslabel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
        left: wp (179/375.0*100),
        top: wp (17/375.0*100),
    },
    dayscontainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: wp(300/375.0*100),
    },
    daycontainer: {
        left: 0,
        right: 0,
        height: wp (100/375.0*100),
    },
    abdaylabel: {
        position: 'absolute',
        left: wp (23/375.0*100),
        top: wp (39/375.0*100),
        bottom: wp (39/375.0*100),
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy-bold',
        color: 'rgba(83,109,254,1)'
    },
    weekdaylabel: {
        position: 'absolute',
        left: wp (44/375.0*100),
        top: wp (5/375.0*100),
        fontFamily: 'gilroy-bold',
        fontSize: wp (40/375.0*100),
    },
    daynumlabel: {
        position: 'absolute',
        left: wp (49/375.0*100),
        top: wp (54/375.0*100),
        fontFamily: 'gilroy-bold',
        fontSize: wp (18/375.0*100),
    },
    dayth: {   
        position: 'absolute',
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
    },
    daynamelabel: { 
        position: 'absolute',
        left: wp (176/375.0*100),
        top: wp (28.5/375.0*100),
        width: wp (125/375.0*100),
        fontFamily: 'gilroy',
        fontSize: wp (18/375.0*100),
    },
    futureDayButton: {
        flex: 1,
        flexDirection: 'row'
        // justifyContent: 'space-evenly'
    },
    nextDaysCalendar: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    nextDaysText: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default StyleSheet.create(style);
import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    superContainer: {
        flex: 1
    },
    container: {
        flex: 0.94
    },
    containerContent: {
        paddingLeft: wp(3.5),
        paddingRight: wp(3.5)
    },
    helloMsg: {
        fontSize: 30,
        fontFamily: 'gilroy'
    },
    stdText: {
        fontSize: 18,
        fontFamily: 'gilroy'
    },
    topContent: { // this is all content including "REST OF THE DAY" and above
        height: hp(35),
        paddingTop: hp(6),
        paddingLeft: wp(3.5),
        paddingRight: wp(3.5)
    },
    nextClassContent: {
        flex: 1,
        // height: hp(10),
        flexDirection: 'row'
    },
    clock: {
        flex: 0.5,
        fontSize: 45,
        fontFamily: 'gilroy'
    },
    classContentLeftBox: {
        flex: 0.5,
        justifyContent: 'center',
        textAlignVertical: 'center'
    },
    restOfDayBox: {
        flex: 1,
        height: hp(20),
        padding: hp(2),
        backgroundColor: 'rgba(242,242,242,1)',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    upcomingDayBox: {
        flex: 1,
        height: hp(42),
        paddingTop: hp(3),
        paddingBottom: hp(3),
        paddingLeft: wp(1),
        paddingRight: wp(1)
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
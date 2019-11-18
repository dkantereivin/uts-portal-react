import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    view: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center'
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: hp(100),
        width: wp(100)
    },
    icon: {
        position: 'absolute',
        left: wp(31.5),
        top: hp(17.5),
        height: hp(18),
        width: wp(39)
    },
    buildings: {
        position: 'absolute',
    //     // left: wp(-110),
    //     // top: hp(33),
        height: hp(104),
        width: wp(350),
    }//,
    // frontBuildings: {
    //     position: 'absolute',
    //     height: hp(118),
    //     width: wp(586),
    // }    
}
export default StyleSheet.create(style);

import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        top: 0, 
        width: wp (100),
        height: hp (100),
    },
    frontBuildings: {
        position: 'absolute',
        left: -wp (264/375.0*100),
        top: hp (257/812.0*100),
        width: wp (1026.5/375.0*100),
        height: hp (660.5/812.0*100),
    },
    rearBuildings: {
        position: 'absolute',
        left: -wp(264/375.0*100),
        top: -hp(43/812.0*100),
        width: wp (1942/375.0*100),
        height: hp (853/812.0*100),
    },
    logo: {
        position: 'absolute',
        left: wp (117/375.0*100),
        top: hp (129/812.0*100),
        height: wp (147/375.0*100),
        width: wp (147/375.0*100),
    }
}
export default StyleSheet.create(style);

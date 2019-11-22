import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    container: {
        flex: 1
    },
    rearBuildings: {
        position: 'absolute',
        left: wp(-264/375.0*100),
        top: hp(-43/812.0*100),
        width: wp(1942/375.0*100),
        height: hp(853/812.0*100)
    },
    frontBuildings: {
        position: 'absolute',
        left: wp(-264/375.0*100),
        top: hp(257/812.0*100),
        width: wp(1026.5/375.0*100),
        height: hp(660.5/812.0*100)
    },
    background: {
        position: 'absolute',
        left: wp(0),
        top: hp(0),
        width: wp(100),
        height: hp(100)
    }
};

export default StyleSheet.create(style);
import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    container: {
        flex: 1
    },
    rearBuildings: {
        position: 'absolute',
        left: wp(-70.4),
        top: hp(-5.30),
        width: wp(517.87),
        height: hp(105.05)
    },
    frontBuildings: {
        position: 'absolute',
        left: wp(-70.4),
        top: hp(31.65),
        width: wp(273.73),
        height: hp(81.34)
    },
    background: {
        position: 'absolute',
        left: wp(0),
        top: hp(0),
        width: wp(100),
        height: hp(100)
    },
    icon: {
        position: 'absolute',
        opacity: 0,
        left: wp(31.2),
        top: hp(15.89),
        width: wp(39.33),
        height: wp(39.2)
    }
};

export default StyleSheet.create(style);
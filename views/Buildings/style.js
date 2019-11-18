import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    container: {
        flex: 1
    },
    rearBuildings: {
        position: 'absolute',
        width: wp(273.5),
        height: hp(81.5)
    },
    frontBuildings: {
        position: 'absolute',
        width: wp(518),
        height: hp(105)
    }
};

export default StyleSheet.create(style);
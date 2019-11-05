import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
    background: {
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        backgroundColor: 0xF2F2F2
    }
}
export default StyleSheet.create(style);

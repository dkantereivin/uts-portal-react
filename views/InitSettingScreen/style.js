import { StyleSheet, Dimensions } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
   weirdPerson: {
        position: 'absolute',
        height: hp (439.0/812.0*100),
        width: wp (564.0/375.0*100),
        left: wp (-94.0/375.0*100),
        top: hp (-49.0/812.0*100),
   },
   title: {
        fontFamily: 'gilroy-extrabold',
        fontSize: wp(30/375.0*100),
        color: 'black',
        position: 'absolute',
        height: hp (74.0/812.0*100),
        width: wp (258.0/375.0*100),
        left: wp (28.0/375.0*100),
        top: hp (356.0/812.0*100),
   },
   subtitle: {
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy-light',
        color: 'black',
        position: 'absolute',
        height: hp (42.0/812.0*100),
        width: wp (277.0/375.0*100),
        left: wp (29.0/375.0*100),
        top: hp (422.0/812.0*100),
   },
}

export default StyleSheet.create (style);
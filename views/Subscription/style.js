import { StyleSheet } from 'react-native';

import {widthPercentageToDP as wp, 
        heightPercentageToDP as hp} from 'react-native-responsive-screen'

const style = {
     weirdPersonContainer: {
          position: 'absolute',
        height: hp (439.0/812.0*100),
        width: wp (564.0/375.0*100),
        left: -wp (94.0/375.0*100),
        top: -hp (79.0/812.0*100),
     },
   weirdPerson: {
        position: 'absolute',
        height: hp (439.0/812.0*100),
        width: wp (564.0/375.0*100),
        left: 0,
        top: 0,
   },
   title: {
        fontFamily: 'gilroy-bold',
        fontSize: wp(30/375.0*100),
        color: 'black',
        position: 'absolute',
        width: wp (258.0/375.0*100),
        left: wp (28.0/375.0*100),
        top: hp (356.0/812.0*100),
        lineHeight: wp (37/375.0*100),
   },
   subtitle: {
        fontSize: wp (18/375.0*100),
        fontFamily: 'gilroy',
        color: 'black',
        position: 'absolute',
        lineHeight: wp (21/375.0*100),
        width: wp (277.0/375.0*100),
        left: wp (29.0/375.0*100),
        top: hp (442.0/812.0*100),
   },
   generalCircle: {
        position: 'absolute',
        top: hp (504/812.0*100),
        left: wp (50/375.0*100),
        width: hp (118/812.0*100),
        height: hp (118/812.0*100),
   },
   articleCircle: {
        position: 'absolute',
        top: hp (537/812.0*100),
        left: wp (189/375.0*100),
        width: hp (98/812.0*100),
        height: hp (98/812.0*100),
   },
   surveysCircle: {
        position: 'absolute',
        top: hp (634/812.0*100),
        left: wp (89/375.0*100),
        width: hp (118/812.0*100),
        height: hp (118/812.0*100),
   },
   houseCircle: {
        position: 'absolute',
        top: hp (650/812.0*100),
        left: wp (225/375.0*100),
        width: hp (162/812.0*100),
        height: hp (162/812.0*100),
   },
   bottomLeftCircle: {
        position: 'absolute',
        top: hp (731/812.0*100),
        left: -wp (30/375.0*100),
        width: hp (118/812.0*100),
        height: hp (118/812.0*100),
   },
   leftCircle: {
        position: 'absolute',
        top: hp (601/812.0*100),
        left: -wp (49/375.0*100),
        width: hp (99/812.0*100),
        height: hp (99/812.0*100),
   },
   rightCircle: {
        position: 'absolute',
        top: hp (468/812.0*100),
        left: wp (306/375.0*100),
        width: hp (118/812.0*100),
        height: hp (118.0/812.0*100),
   },
   arrowContainer: {
        position: 'absolute',
        top: hp (513/812.0*100),
        left: wp (329/375.0*100),
        width: wp (46/375.0*100),
        height: hp (27.5/812.0*100),
   },
   arrow: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp (46/375.0*100),
        height: hp (27.5/812.0*100),
   }
}

export default StyleSheet.create (style);
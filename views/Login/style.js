import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    container: {
        flex: 1,
        paddingTop:hp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        // flex: 1,
        width: wp(140),
        height: hp(45),
        resizeMode: 'stretch'
    },
    inputAreaContainer: { // this is what will be fading in and out
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    actionBox: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    buttonBox: {
        paddingTop: hp(5),
        flex: 0.5,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    fieldsTitle: { // description/title for fields
        fontSize: 30,
        justifyContent: 'center',
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: hp(2.5),
        paddingBottom: hp(0.5)
    },
    fieldsDescription: { // description/title for fields
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: wp(7),
        paddingRight: wp(7),
        paddingTop: 0,
        paddingBottom: hp(5)
    },
    badEmailText: {
        fontSize: 8,
        textAlign: 'left'
    }
};

export default StyleSheet.create(style);
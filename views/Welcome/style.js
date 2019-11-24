import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = {
    container: {
        flex: 1
    },
    topDiv: {
        flex: 0.25
    },
    image: {
        flex: 1,
        width: wp(125),
        resizeMode: 'stretch'
    },
    textBox: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBuffer: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        flex: 0.25,
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default StyleSheet.create(style);
import {PropTypes} from 'prop-types';
import React, {Component} from 'react';
import {Animated, Dimensions, Keyboard, StyleSheet, TextInput, UIManager} from 'react-native';

const {State: TextInputState} = TextInput;

class KeyboardShift extends Component 
{
    shift = new Animated.Value (0);

    componentWillMount() {
        this.didShow = Keyboard.addListener('keyboardDidShow', this.handleDidShow);
        this.didHide = Keyboard.addListener ('keyboardDidHide', this.handleDidHide);
    }

    componentWillUnmount()
    {
        this.didShow.remove();
        this.didHide.remove();
    }

    render ()
    {
        const {children: renderProps} = this.props;
        return (
            <Animated.View style = {style.container, {transform: [{translateY: this.shift}]}}>
                {renderProps()}
            </Animated.View>
        );
    }

    handleDidShow ()
    handleDidShow ()
    {

    }

    handleDidHide()
    {

    }

}

KeyboardShift.propTypes = {
    children: PropTypes.func.isRequired,
}

const style = SytleSheet.create ({
    container: {
        height: hp (100),
        width: wp (100),
        position: 'absolute',
        top: 0,
        left: 0,
    }
});

export default KeyboardShift;
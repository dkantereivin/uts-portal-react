import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const style = StyleSheet.create({
    field: {
        height: 37,
        width: wp(75),
        fontFamily: 'gilroy',
        fontSize: 30,
        color: 'rgba(189,189,189,1)'
    },
    view: {
        borderBottomColor: 'rgba(189,189,189,1)',
        borderBottomWidth: 1
    }
});

class TextInputField extends React.Component
{
    // props: text: str, onChangeText: func, [keyboard: str, autocomplete: str, style: obj]
    render()
    {
        return (
            <View style={style.view}>
                <TextInput 
                    style={[style.field, this.props.style]}
                    maxLength={this.props.maxLength || 20} // max 20 characters for field
                    textAlignVertical='bottom'
                    autoCorrect={false}
                    keyboardAppearance='light'
                    keyboardType={this.props.keyboard || 'default' /*optional prop*/}
                    placeholder={this.props.text}
                    autoCompleteType={this.props.autocomplete || 'off'}
                    returnKeyType='done'
                    onChangeText={this.props.onChangeText}
                    onEndEditing={this.props.onEndEditing}
                />
            </View>
        )
    }
}

export default TextInputField;
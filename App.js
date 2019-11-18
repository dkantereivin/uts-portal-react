import React from 'react';
import * as Font from 'expo-font';
import { SafeAreaView, Text, View, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Buildings from './views/Buildings/view';
import Welcome from './views/Welcome/view';
import Login from './views/Login/view';

const gNavigator = createStackNavigator({
    Buildings,
    Welcome,
    Login
},
{
    initialRouteName: 'Buildings',
    headerMode: 'none'
});

const GlobalContainer = createAppContainer(gNavigator);

class App extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            firstTime: null
        }
    }

    componentWillMount()
    {
        AsyncStorage.getItem('@user/first_name')
            .then((val) => this.setState({firstTime: val == null}));
    }

    componentDidMount()
    {
        Font.loadAsync({
            'gilroy': require('./assets/fonts/gilroy.ttf'),
            'gilroy-bold': require('./assets/fonts/gilroy-bold.ttf'),
            'montserrat': require('./assets/fonts/montserrat.ttf')
        });
    }

    render()
    {
        if (this.state.firstTime == null)
            return (<Text>{null}</Text>);
        return (
            <SafeAreaView style={{flex: 1}}>
                <GlobalContainer />
            </SafeAreaView>
        );
    }
}



export default App;
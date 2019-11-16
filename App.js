import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from "./views/Dashboard/view";
import LoadingScreen from "./views/LoadingScreen/view";
import DayNightScreen from ".views/DayNightScreen/view";

export default function App() {
  return (
    <View style={{flex: 1}}>
      <DayNightScreen/>
    </View>
  );
}


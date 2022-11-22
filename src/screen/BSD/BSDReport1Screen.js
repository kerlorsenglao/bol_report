import { View, Text,StyleSheet,ImageBackground,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Daily from './Report1/Daily';
import MonthLy from './Report1/MonthLy';
import YearLy from './Report1/YearLy';

const Tab = createMaterialTopTabNavigator();

const BSDReport1Screen = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#daf0f7' },
        tabBarActiveTintColor:"black",
        tabBarLabelStyle:{fontWeight:"bold"},
      }}
    >
      <Tab.Screen name="DaiLy" component={Daily} />
      <Tab.Screen name="MonthLy" component={MonthLy} />
      <Tab.Screen name="YearLy" component={YearLy} />
    </Tab.Navigator>
  )
}

export default BSDReport1Screen

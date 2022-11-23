import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import Daily from './Daily';
import Monthly from './Monthly';
import Yearly from './Yearly';
import { COLORS, SIZES } from '../../../constant';

const TopTab = createMaterialTopTabNavigator();

export default function BSDReportScreen({navigation}) {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.secondary },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle:{fontSize: SIZES.medium},
        swipeEnabled: false,// ຕ້ອງຕິດ tab ເທົ່ານັ້ນຈຶ່ງສາມາດປ່ຽນ screen
      }}
    >
      <TopTab.Screen 
        name='Daily' 
        component={Daily}
        options={{
          title:'ປະຈຳວັນ'
        }}
      />
      <TopTab.Screen 
        name='Monthly' 
        component={Monthly}
        options={{
          title:'ປະຈຳເດືອນ'
        }}
        />
      <TopTab.Screen 
        name='Yearly' 
        component={Yearly}
        options={{
          title:'ປະຈຳປີ'
        }}
        />
    </TopTab.Navigator>
  )
}

const styles = StyleSheet.create({})
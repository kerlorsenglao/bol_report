import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';

import Daily from './Daily';
import Monthly from './Monthly';
import Quaterly from './Quaterly';
import Yearly from './Yearly';
import { COLORS, SIZES } from '../../../../constant';


const TopTab = createMaterialTopTabNavigator();

const BODAccountingServiceScreen = ({navigation}) => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: COLORS.secondary },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle:{fontSize: SIZES.medium},
        swipeEnabled: false,// ຕ້ອງຕິດ tab ເທົ່ານັ້ນຈຶ່ງສາມາດປ່ຽນ screen
        // tabBarScrollEnabled:true
      }}
    >
      <TopTab.Screen 
        name='Daily' 
        component={Daily}
        options={{
          title:'ວັນ'
        }}
        />
      <TopTab.Screen 
        name='Monthly' 
        component={Monthly}
        options={{
          title:'ເດືອນ'
        }}
        />
      <TopTab.Screen 
        name='Quaterly' 
        component={Quaterly}
        options={{
          title:'ໄຕມາດ'
        }}
        />
      <TopTab.Screen 
        name='Yearly' 
        component={Yearly}
        options={{
          title:'ປີ'
        }}
        />
    </TopTab.Navigator>
  )
}

export default BODAccountingServiceScreen
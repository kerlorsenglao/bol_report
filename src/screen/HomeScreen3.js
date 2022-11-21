import { View, Text,StyleSheet,ImageBackground, ScrollView, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, FONTS } from '../constant'
import SectionItem from '../components/SectionItem'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from '../components/DrawerContent'
import HomePageScreen from './HomePageScreen'
import BSDReport1Screen from './BSD/BSDReport1Screen'

const Drawer = createDrawerNavigator();

const HomeScreen3 = () => {
    return (
        <Drawer.Navigator 
            initialRouteName='HomePage'
            backBehavior='initialRoute'
            screenOptions={({route})=>({
                headerShown:false
                
              })}
            
            drawerContent={(props)=> <DrawerContent {...props}  />}
        >
          <Drawer.Screen name="HomePage" component={HomePageScreen} />
          <Drawer.Screen name="BSDReport1" component={BSDReport1Screen}  />

        </Drawer.Navigator>
      )
}

export default HomeScreen3
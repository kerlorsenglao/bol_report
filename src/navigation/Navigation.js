import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screen/HomeScreen'
import RegisterScreen from '../screen/RegisterScreen'
import LoginScreen from '../screen/LoginScreen'

const StackNavigation = createNativeStackNavigator();
export default function Navigation() {
    return (
        <NavigationContainer>
            <StackNavigation.Navigator>
                
                <StackNavigation.Screen 
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown:false
                    }}
                />

                <StackNavigation.Screen 
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerShown:false
                    }}
                />
                
                <StackNavigation.Screen 
                    name="Home"
                    component={HomeScreen}
                />
                
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}
import { View, Text } from 'react-native'
import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen2 from '../screen/HomeScreen2'
import RegisterScreen from '../screen/RegisterScreen'
import LoginScreen from '../screen/LoginScreen'
import SearchScreen from '../screen/SearchScreen'
import ResultScreen from '../screen/ResultScreen'
import SplashScreen from '../screen/SplashScreen'
import { AuthContext } from '../context/AuthContext'

const StackNavigation = createNativeStackNavigator();

export default function Navigation() {
    const {token, splashLoading} = useContext(AuthContext);

    return (
        <NavigationContainer>
            <StackNavigation.Navigator>
                {
                    splashLoading ?
                    (
                        <StackNavigation.Screen
                            name = "Splash"
                            component={SplashScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    ):
                        token ?
                        (
                            <>

                            
                            
                            <StackNavigation.Screen 
                                name="Home"
                                component={HomeScreen2}
                                options={{
                                    headerShown: false
                                }}
                            />
                            
                            <StackNavigation.Screen 
                                name="Search"
                                component={SearchScreen}
                                options={{
                                    headerShown:false
                                }}
                            />
                            
                            <StackNavigation.Screen 
                                name="Result"
                                component={ResultScreen}
                                options={{
                                    headerShown:false
                                }}
                            />
                            </>
                        ):
                        (
                            <>
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
                            </>
                        )
                }
                
                
               
                
            </StackNavigation.Navigator>
        </NavigationContainer>
    )
}
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import { COLORS } from './src/constant'
import Navigation from './src/navigation/Navigation'
import { AuthContext,AuthProvider } from './src/context/AuthContext'

export default function App() {
    return (
       <AuthProvider>
            <Navigation/>
       </AuthProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:COLORS.white
    }
})
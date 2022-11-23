import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import BackInHomeComponent from '../../components/BackInHomeComponent'

export default function Monthly() {
    const navigation = useNavigation();
    return (
        <View style={{flex:1}}>
            <Text>Monthly</Text>
            <BackInHomeComponent navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'

export default function BSDReportScreen({navigation}) {
  return (
    <View
      style={{
        flex:1
      }}
    >
      <Text>BSDReportScreen</Text>
      <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})
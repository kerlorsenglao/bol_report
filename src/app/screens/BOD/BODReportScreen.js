import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'

export default function BODReportScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text>BODReportScreen</Text>
      <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})
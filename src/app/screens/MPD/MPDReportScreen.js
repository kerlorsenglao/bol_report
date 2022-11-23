import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BackInHomeComponent from '../../components/BackInHomeComponent'

export default function MPDReportScreen({navigation}) {
  return (
    <View
      style={{
        flex:1
      }}
    >
      <Text>MPDReportScreen</Text>
      <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})
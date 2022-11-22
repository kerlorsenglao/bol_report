import { View, Text } from 'react-native'
import React from 'react'
import { SIZES } from '../../constant'

export default function FooterComponent() {
  return (
    <View
        style={{
            width:'100%',
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:10
        }}
    >
      <Text style={{fontSize: SIZES.large, fontWeight:'bold'}}>BOL</Text>
      <Text style={{fontSize: SIZES.medium}}>bol@gmail.co.la</Text>
    </View>
  )
}
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'


export default function BackInHomeComponent({navigation}) {
  return (
    <TouchableOpacity
        onPress={()=>navigation.navigate('InHome')}
        style={{
            position: 'absolute',
            bottom: 15,
            right:15,
            height:50,
            width:50,
            borderRadius:30,
            backgroundColor: COLORS.primary,
            justifyContent:'center',
            alignItems:'center',
            shadowColor: COLORS.black,
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
        }}
    >
      <Text style={{fontSize: SIZES.small}}>ໜ້າຫຼັກ</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})
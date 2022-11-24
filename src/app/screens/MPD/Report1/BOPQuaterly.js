import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../../constant'

export default function BOPQuaterly() {
  return (
    <View >
        <View 
            style={{alignItems:'center',marginTop:5}}
        >
            <Text style={{color: COLORS.primary,fontSize: SIZES.medium, fontWeight:'bold'}}>ສະຖິຕິດຸນຊຳລະກັບຕ່າງປະເທດ</Text>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({})
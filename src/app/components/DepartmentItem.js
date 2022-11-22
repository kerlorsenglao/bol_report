import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'

export default function DepartmentItem() {
  return (
    <TouchableOpacity
        style={{
            backgroundColor: '#669999',
            padding: 10,
            margin: 10,
            borderColor: COLORS.gray_ligth,
            borderWidth:1,
            borderRadius:10
        }}
    >
      <Text style={{color: '#ffffff', fontSize: SIZES.medium}}>ກົມຄຸ້ມຄອງທະນາຄານທຸລະກິດ</Text>
    </TouchableOpacity>
  )
}
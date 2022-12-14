import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'

export default function DepartmentItem({navigation,deptName,screenName}) {
  return (
    <TouchableOpacity
        // ker style
        // style={{
        //     backgroundColor: '#669999',
        //     padding: 10,
        //     margin: 10,
        //     borderColor: COLORS.gray_ligth,
        //     borderWidth:1,
        //     borderRadius:10
        // }}

        // toum style
        style={{
            backgroundColor: '#daf0f7',
            paddingHorizontal: 20,
            paddingVertical:20,
            margin: 10,
            borderColor: COLORS.primary,
            borderWidth:1,
            borderRadius:15,
            shadowOffset: {width: 1, height: 1},
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation:7
        }}

        onPress={()=>{
          navigation.navigate(screenName)
        }}
    >
      <Text style={{color: '#000', fontSize: SIZES.medium}}>{deptName}</Text>
    </TouchableOpacity>
  )
}
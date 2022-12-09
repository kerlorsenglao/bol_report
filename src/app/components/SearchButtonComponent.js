import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constant'


const SearchButtonComponent = ({searchFunction}) => {
  return (
    <TouchableOpacity
        style={{
            flex:1,
            paddingHorizontal:15,
            backgroundColor:COLORS.primary,
            justifyContent:'center',
            alignItems:'center',
            marginHorizontal:2,
            borderRadius:5,
        }}

        onPress={()=>{
            searchFunction()
        }}
    >
        <Text>ຄົ້ນຫາ</Text>
    </TouchableOpacity>
  )
}

export default SearchButtonComponent
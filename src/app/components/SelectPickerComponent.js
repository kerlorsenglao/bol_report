import { View, Text } from 'react-native'
import React,{useState} from 'react'

import { COLORS, SIZES } from '../../constant'
import {Picker} from '@react-native-picker/picker';

const SelectPickerComponent = ({data,setData,datas}) => {
  return (
    <View>
        <Picker
            mode='dropdown'
            selectedValue={data}
            onValueChange={(itemValue, itemIndex) =>
                setData(itemValue)
            }
            style={{
                color: COLORS.primary,
                height: 45,
                alignItems:'center',
                textAlign:'center'
            }}
            dropdownIconColor={COLORS.primary}
                        
        >
            {
                datas.map((data,index)=>{
                    return <Picker.Item key={index} label={data} value={data} />
                })
            }
        </Picker>
    </View>
  )
}

export default SelectPickerComponent
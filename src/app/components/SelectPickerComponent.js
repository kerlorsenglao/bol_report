import { View, Text } from 'react-native'
import React,{useState} from 'react'

import { COLORS, SIZES } from '../../constant'
import {Picker} from '@react-native-picker/picker';

const SelectPickerComponent = ({data,setData,datas}) => {
  return (
    <View style={{
        flex: 1,
        borderBottomColor: COLORS.primary, 
        borderBottomWidth: 1,
        marginHorizontal:5
        }}>
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
                textAlign:'center',
                // borderBottomColor: COLORS.primary,
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
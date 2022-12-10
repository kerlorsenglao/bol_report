import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

import MonthPicker from 'react-native-month-year-picker';
import { COLORS, SIZES } from '../../constant'

const MonthYearPickerComponent = ({my1,setMY1,show1,setShow1,my2,setMY2,show2,setShow2,my2status,setMY2status}) => {

    const onMonthChange1=(event,newDate)=>{
        setShow1(false)
        setMY1(newDate || my1)
    }

    const onMonthChange2=(event,newDate)=>{
        setShow2(false)
        if(newDate){
            setMY2(newDate)
            setMY2status(true)
        }else{
            setMY2(my2)
            setMY2status(false)
        }
        
    }

  return (
    <View>
        <View style={{flexDirection:'row'}}>
            <View style={{flex:3}}>
                {/* ເລືອກເດືອນທຳອິດ */}
                <TouchableOpacity
                    style={{
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        marginHorizontal:10,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={()=>{
                        setShow1(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {(my1.getMonth()+1)+'/'+my1.getFullYear()}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>ຫາ</Text>
            </View>

            <View style={{flex:3}}>
                {/* ເລືອກເດືອນທີ 2 */}
                <TouchableOpacity
                    style={{
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        marginHorizontal:10,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                    onPress={()=>{
                        setShow2(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {
                            my2status ? (my2.getMonth()+1)+'/'+my2.getFullYear()
                            : 'mm/YYYY'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        {/* -------------------------- */}

        {
            show1
            &&         
            <MonthPicker
                onChange={onMonthChange1}
                value={my1}
                okButton='ຕົກລົງ'
                cancelButton='ຍົກເລີກ'
                locale='la'
                mode='number'
            />
        }

        {
            show2 
            &&         
            <MonthPicker
                onChange={onMonthChange2}
                value={my2}
                okButton='ຕົກລົງ'
                cancelButton='ຍົກເລີກ'
                locale='la'
                mode='number'
            />
        }
    </View>
  )
}

export default MonthYearPickerComponent
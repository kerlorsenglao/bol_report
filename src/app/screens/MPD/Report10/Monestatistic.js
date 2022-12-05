// ສະຖິຕິເງີນຕາ

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';

import MonthPicker from 'react-native-month-year-picker';

import { COLORS,SIZES } from '../../../../constant'
import { onChange } from 'react-native-reanimated';
import {  getMonth,getYear } from '../../../help/Functions';

export default function Monestatistic() {
    const [isLosding, setIsLoading] = useState(false)
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [showMonthPicker,setShowMonthPicker ]= useState(false)
    const [date,setDate] = useState();
    const [t, setT] = useState()

    const onMonthChange=(event,newDate)=>{
        setShowMonthPicker(false)
        setDate(newDate)
    }
  return (
    <View style={{flex: 1}}>
        <Spinner visible={isLosding}/>
        <View 
            style={{
                flexDirection:'row',
                justifyContent:"space-evenly",
                marginTop:2
            }}
            >
            <TouchableOpacity 
                onPress={()=>setShowMonthPicker(true)}
                style={{
                    flex: 1.5,
                    marginHorizontal: 2,
                    justifyContent: 'center',
                    alignItems:'center',
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    paddingTop: 10
                }}>
                <Text style={{color: date ? COLORS.primary:COLORS.gray, fontSize: SIZES.medium,}}>{date ? getMonth(date) :'ເດືອນ'}</Text>
            </TouchableOpacity>
            <View style={{
                    flex:2.5,
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderRadius:5,
                    marginHorizontal:2,
                    }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={t}
                        onValueChange={(itemValue, itemIndex) =>
                            setT(itemValue)
                        }
                        style={{
                            color: !t || t=='' ?COLORS.gray:COLORS.primary ,
                            height: 45,
                            alignItems:'center',
                        }}
                        dropdownIconColor={!t || t=='' ?COLORS.gray:COLORS.primary}
                        
                        >
                        <Picker.Item label="ໄຕມາດ" value=''/>
                        <Picker.Item label="ໄຕມາດ1" value="T1" />
                        <Picker.Item label="ໄຕມາດ2" value="T2" />
                        <Picker.Item label="ໄຕມາດ3" value="T3" />
                        <Picker.Item label="ໄຕມາດ4" value="T4" />
                    </Picker>
            </View>
            <TouchableOpacity 
                onPress={()=>setOpenDatePicker(true)}
                style={{
                    flex: 1.8,
                    marginHorizontal: 2,
                    justifyContent: 'center',
                    alignItems:'center',
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    paddingTop: 10
                }}>
                <Text style={{color: date ? COLORS.primary:COLORS.gray, fontSize: SIZES.medium,}}>{date ? getYear(date) :'ປີ'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>getBOPReport()}
                style={{
                    flex: 1,
                    marginHorizontal: 2,
                    justifyContent: 'center',
                    alignItems:'center',
                    backgroundColor:COLORS.primary,
                    borderRadius: 5,
                    paddingVertical:10,
                }}>
                <Text style={{color: COLORS.white, fontSize: SIZES.medium}}>ຄົ້ນຫາ</Text>
            </TouchableOpacity>
        </View>
        {
            showMonthPicker 
            &&         
            <MonthPicker
                onChange={onMonthChange}
                value={date ? date : new Date()}
                okButton='ຕົກລົງ'
                cancelButton='ຍົກເລີກ'
                locale='la'
            />
        }
        <View style={{marginTop:5, alignItems:'center'}}>
            <Text style={{color: COLORS.primary,fontSize: SIZES.medium, fontWeight:'bold'}}>ສະຖິຕິເງີນຕາ</Text>
        </View>
        <View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import MonthPicker from 'react-native-month-year-picker';


import { COLORS, SIZES } from '../../../../constant'
import {  getMonth,getYear,getMonthYear } from '../../../help/Functions';

export default function MSMonthLy() {
  const [isLoading, setIsLoading] = useState(false)
  const [month1, setMonth1] = useState()
  const [month2, setMonth2] = useState()
  const [showMonth1Picker, setShowMonth1Picker] = useState(false)
  const [showMonth2Picker, setShowMonth2Picker] = useState(false)

  const onMonth1Change=(event,newDate)=>{
    setShowMonth1Picker(false)
    setMonth1(newDate)
  }
  const onMonth2Change=(event,newDate)=>{
    setShowMonth2Picker(false)
    setMonth2(newDate)
  }
  
  return (
    <View style={{flex: 1}}>
      <Spinner visible={isLoading}/>
           <View 
            style={{
                flexDirection:'row',
                justifyContent:"space-evenly",
                marginTop:2
            }}
            >
            <TouchableOpacity 
                onPress={()=>setShowMonth1Picker(true)}
                style={{
                    flex: 1.5,
                    marginHorizontal: 2,
                    justifyContent: 'center',
                    alignItems:'center',
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    paddingTop: 10
                }}>
                <Text style={{color: month1 ? COLORS.primary:COLORS.gray, fontSize: SIZES.medium,}}>{month1 ? getMonthYear(month1) :'ເດືອນ'}</Text>
            </TouchableOpacity>
            <View style={{justifyContent:'center',alignItems:'center', paddingTop: 8}}>
                <Text style={{color: COLORS.gray}}>ຫາ</Text>
            </View>
            <TouchableOpacity 
                onPress={()=>setShowMonth2Picker(true)}
                style={{
                    flex: 1.5,
                    marginHorizontal: 2,
                    justifyContent: 'center',
                    alignItems:'center',
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    paddingTop: 10
                }}>
                <Text style={{color: month2 ? COLORS.primary:COLORS.gray, fontSize: SIZES.medium,}}>{month2 ? getMonthYear(month2) :'ເດືອນ'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={()=>alert('calling api to retrive data from backend')}
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
            showMonth1Picker 
            &&         
            <MonthPicker
                onChange={onMonth1Change}
                value={month1 ? month1 : new Date()}
                okButton='ຕົກລົງ'
                cancelButton='ຍົກເລີກ'
                locale='la'
                mode='number'
            />
        }
                {
            showMonth2Picker 
            &&         
            <MonthPicker
                onChange={onMonth2Change}
                value={month2 ? month2 : new Date()}
                okButton='ຕົກລົງ'
                cancelButton='ຍົກເລີກ'
                locale='la'
                mode='number'
            />
        }
    </View>
  )
}
const styles = StyleSheet.create({})
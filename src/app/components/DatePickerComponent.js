import { View, Text, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

import DatePicker from 'react-native-date-picker'
import { COLORS, SIZES } from '../../constant'

const DatePickerComponent = ({fdate,setFdate,fopen,setFopen,tdate,setTdate,topen,setTopen,tstatus,setTstatus}) => {

  return (
    <View>
        <View style={{flexDirection:'row'}}>
            <View style={{flex:3}}>
                {/* ເລືອກວັນທີ 1 */}
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
                        setFopen(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {fdate.getDate()+'/'+(fdate.getMonth()+1)+'/'+fdate.getFullYear()}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>ຫາ</Text>
            </View>

            <View style={{flex:3}}>
                {/* ເລືອກວັນທີ 2 */}
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
                        setTopen(true)
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {
                            tstatus? tdate.getDate()+'/'+(tdate.getMonth()+1)+'/'+tdate.getFullYear()
                            : 'dd/mm/YYYY'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

        {/* fdate */}
        <DatePicker
                title='ເລືອກວັນທີ'
                modal
                confirmText='ຕົກລົງ'
                cancelText='ຍົກເລີກ'
                mode='date'
                textColor='#00b3b3'
                open={fopen}
                date={fdate}
                onConfirm={(date) => {
                    setFopen(false)
                    setFdate(date)
                    
                }}
                onCancel={() => {
                    setFopen(false)
                }}
        />

        {/* tdate */}
        <DatePicker
                title='ເລືອກວັນທີ'
                modal
                confirmText='ຕົກລົງ'
                cancelText='ຍົກເລີກ'
                mode='date'
                textColor='#00b3b3'
                open={topen}
                date={tdate}
                onConfirm={(date) => {
                    setTopen(false)
                    setTdate(date)
                    setTstatus(true)
                }}
                onCancel={() => {
                    setTopen(false)
                    setTstatus(false)
                }}
        />
    </View>
  )
}

export default DatePickerComponent
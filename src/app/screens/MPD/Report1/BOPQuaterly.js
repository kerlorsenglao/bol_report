import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../../../constant'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import Ionicons  from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

import BackInHomeComponent from '../../../components/BackInHomeComponent';
import { dateShow, getYear } from '../../../help/Functions';



export default function BOPQuaterly() {
    const navigation = useNavigation()
    const [data, setData] = useState();
    const [t, setT] = useState();
    const [y, setY] = useState()
    const [openDatePicker,setOpenDatePicker]= useState(false)
  return (
    <View style={{flex:1}}>
        <View 
            style={{alignItems:'center',marginTop:1}}
        >
            <View 
                style={{
                    flexDirection:'row',
                    justifyContent:"space-evenly",
                }}
            >
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
                        <Picker.Item label="ເລືອກໄຕມາດ" value=''/>
                        <Picker.Item label="ໄຕມາດ 1" value="1" />
                        <Picker.Item label="ໄຕມາດ 2" value="2" />
                        <Picker.Item label="ໄຕມາດ 3" value="3" />
                        <Picker.Item label="ໄຕມາດ 4" value="4" />
                    </Picker>
                </View>
                <TouchableOpacity 
                    onPress={()=>setOpenDatePicker(true)}
                    style={{
                        flex: 2,
                        marginHorizontal: 2,
                        justifyContent: 'center',
                        alignItems:'center',
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        paddingTop: 10
                    }}>
                    <Text style={{color: y ?COLORS.primary:COLORS.gray, fontSize: SIZES.medium,}}>{y ? getYear(y) :'ເລືອກປີ'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
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
            <View style={{marginTop:5}}>
                <Text style={{color: COLORS.primary,fontSize: SIZES.medium, fontWeight:'bold'}}>ສະຖິຕິດຸນຊຳລະກັບຕ່າງປະເທດ</Text>
            </View>
            
        </View>
        <DatePicker
                title='ເລືອກປີ'
                modal
                confirmText='ຕົກລົງ'
                cancelText='ຍົກເລີກ'
                mode='date'
                textColor='#00b3b3'
                open={openDatePicker}
                date={y ? y : new Date()}
                onConfirm={(date) => {
                    setOpenDatePicker(false)
                    setY(date)
                }}
                onCancel={() => {
                    setOpenDatePicker(false)
                }}
            />
        {
            data ? 
            (
                <ScrollView>

                </ScrollView>
            )
            :
            (
                <View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color: COLORS.gray,fontSize: SIZES.large,}}>ບໍ່ມີຂໍ້ມູນ</Text>
                </View>
            )
        }
        <BackInHomeComponent navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})
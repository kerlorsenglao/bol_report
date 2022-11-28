import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
import { COLORS, SIZES } from '../../../../constant'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import Ionicons  from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay'
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import Config from "react-native-config";

import BackInHomeComponent from '../../../components/BackInHomeComponent';
import { dateShow, getYear,convertJSToAR } from '../../../help/Functions';


const  API_URL = Config.API_URL;
export default function BOPQuaterly() {
    const navigation = useNavigation()
    const [data, setData] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [t, setT] = useState()
    const [y, setY] = useState()
    const [openDatePicker,setOpenDatePicker]= useState(false)
    const report_type = 'InReport'

    const getBOPReport= async()=>{
        setIsLoading(true)
        await axios.post(`${API_URL}/MonetaryPolicyBOPQuaterlyReport`,{
            webServiceUser: "bol_it",
            webServicePassword: "123456",
            report_type: report_type,
            date_type: !t || t=='' ? 'Y' : t, //= T1, T2, T3,T4
            date: getYear(y)
        }
    )
    .then(res=>{
        if(res.data.responseCode == '000'){
            if(res.data.data !=""){
                const Data = convertJSToAR(res.data.data);
                console.log('=====>',typeof(Data))
                setData(res.data.data)
            }else{
                setData()
            }
        }else{// error
            let msg = res.data.msg
            Toast.show({
                type: 'error',
                text1: 'ຄົ້ນຫາບໍ່ສຳເລັດ!',
                text2: msg
            });
        }
        setIsLoading(false)
    })
    .catch(e =>{
        console.log(e)
        setIsLoading(false)
    })
    }
  return (
    <View style={{flex:1}}>
         <Spinner visible={isLoading} color='gray'/>  
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
                        <Picker.Item label="ໄຕມາດ 1" value="T1" />
                        <Picker.Item label="ໄຕມາດ 2" value="T2" />
                        <Picker.Item label="ໄຕມາດ 3" value="T3" />
                        <Picker.Item label="ໄຕມາດ 4" value="T4" />
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
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";
import DatePicker from 'react-native-date-picker'
import {Picker} from '@react-native-picker/picker';

import { dateFormat, getDateBefore, dateShow } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import { ScrollView } from 'react-native-gesture-handler';


const  API_URL = Config.API_URL;
export default function Daily() {
    const [isLoading,setIsLoading] = useState(false)
    const [date, setDate] = useState()
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [bank,setBank] = useState('ALL_BANK')
    const [data,setData] = useState();

    const navigation = useNavigation();
    useEffect(()=>{
        getBSDReport()
    },[])
    
const   getBSDReport = async () =>  {
        setIsLoading(true);
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: "BCEL",
                report_type: "InReport",
                date_type: "D",
                date: '2022-11-16'
            }
        )
        .then(res=>{
            console.log(res.data)
            if(res.data.responseCode == '000'){
                // setData(res.data)
                if(res.data.data !=""){
                    setData(res.data.data[0])
                }
                // console.log(res.data.data[0])
            }else{// error
                console.log('Not OK')
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
        <View style={{flex: 1}}>
            <Spinner visible={isLoading} color='gray'/>   
            <View style={{
                flexDirection:'row',
                justifyContent:'space-evenly',
                padding:5
            }}>
                <TouchableOpacity 
                    onPress={()=>setOpenDatePicker(true)}
                    style={{
                        flex: 2,
                        borderBottomColor: COLORS.primary,
                        borderBottomWidth: 1,
                        width:120,
                        marginHorizontal:2,
                        paddingTop:10,
                        paddingBottom: 3,
                        justifyContent:'center',
                        alignItems:'center'
                        // backgroundColor: COLORS.secondary
                    }}
                >
                    <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>
                        {
                            date ? dateShow(date) : dateShow(getDateBefore(new Date()))
                        }
                    </Text>
                </TouchableOpacity>
                <View style={{
                    flex:3,
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                    borderRadius:5,
                    marginHorizontal:2,
                    // backgroundColor:'blue',
                    }}>
                    <Picker
                        mode='dropdown'
                        selectedValue={bank}
                        onValueChange={(itemValue, itemIndex) =>
                            setBank(itemValue)
                        }
                        style={{
                            color: COLORS.primary,
                            height: 45,
                            alignItems:'center'
                        }}
                        dropdownIconColor={COLORS.primary}
                        >
                        <Picker.Item label="ALL_BANK" value='ALL_BANK'/>
                        <Picker.Item label="BCEL" value="BCEL" />
                        <Picker.Item label="LDB" value="LDB" />
                        <Picker.Item label="JDB" value="JDB" />
                        <Picker.Item label="BCEL" value="BCEL" />
                        <Picker.Item label="LDB" value="LDB" />
                        <Picker.Item label="JDB" value="JDB" />
                    </Picker>
                </View>
                <TouchableOpacity
                    style={{
                        flex:1,
                        width: 60,
                        backgroundColor:COLORS.primary,
                        justifyContent:'center',
                        alignItems:'center',
                        marginHorizontal:2,
                        borderRadius:5
                    }}
                >
                    <Text>ຄົ້ນຫາ</Text>
                </TouchableOpacity>
            </View>
            <DatePicker
                title='ເລືອກວັນທີ'
                modal
                confirmText='ຕົກລົງ'
                cancelText='ຍົກເລີກ'
                mode='date'
                textColor='#00b3b3'
                open={openDatePicker}
                date={date? date : new Date()}
                onConfirm={(date) => {
                    setOpenDatePicker(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenDatePicker(false)
                }}
            />
            {
                data ?
                (
                <ScrollView>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginHorizontal:5
                    }}>
                        <Text style={{color: 'blue'}}>{data.total_asset.la_name}</Text>
                        <Text style={{color: 'blue'}}>{data.total_asset.value}</Text>
                        <Text style={{color: 'blue'}}>{data.total_asset.unit}</Text>
                    </View>
                </ScrollView>
                )
                : (<Text style={{color: 'blue'}}>No data here</Text>)
            }
            <BackInHomeComponent navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({})
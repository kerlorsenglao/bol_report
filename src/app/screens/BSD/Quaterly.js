import { StyleSheet, Text, View,TouchableOpacity,useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import axios from "axios";
import Config from "react-native-config";

import {Picker} from '@react-native-picker/picker';

import { getKey, getMonthYear, dateFormat } from '../../help/Functions'
import BackInHomeComponent from '../../components/BackInHomeComponent'
import { COLORS, SIZES } from '../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import ShowItem from '../../components/ShowItem';

import DatePicker from 'react-native-date-picker'

const  API_URL = Config.API_URL;

const Quaterly = () => {
    const navigation = useNavigation();
    const window = useWindowDimensions();
    const windowWidth = window.width;
    const windowHeight = window.height;

    // state
    const [isLoading,setIsLoading] = useState(false)
    const [bank,setBank] = useState('ALL_BANK')
    const [t,setT] = useState('T1')
    const [data,setData] = useState({});
    const [keys,setKeys] = useState([]);

    const [date, setDate] = useState(new Date());
    const [openDatePicker, setOpenDatePicker] = useState(false);

    useEffect(()=>{
        // get data
        getBSDReport(bank,date,t)
    },[])


    // function for MonthLy
    const getBSDReport = async (bnk,date,ty)=>{
        setIsLoading(true);
        await axios.post(`${API_URL}/BankSupervisionReport`,{
                webServiceUser: "bol_it",
                webServicePassword: "123456",
                bank_code: bnk,
                report_type: "InReport",
                date_type: "M",
                date: date.getFullYear()+'-'+(date.getMonth()+1),
                type:ty
            }
        )
        .then(res=>{
            if(res.data.responseCode == '000'){
                if(res.data.data !=""){
                    let newKey = getKey(res.data.data[0])
                    setKeys(newKey)
                    setData(res.data.data[0])
                }else{
                    setData({})
                }
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
        <View style={{flex:1}}>
            <Spinner visible={isLoading} color='gray'/>   
            {/* ສ່ວນ Search new */}

            {
                windowHeight>windowWidth ?
                (
                <View> 
                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,}}>
                        {/* ເລືອກໄຕມາດ */}
                        <View style={{flex:2,
                                borderBottomColor: COLORS.primary,
                                borderBottomWidth: 1,
                                borderRadius:5,
                                marginHorizontal:20,
                        }}>
                            <Picker
                                    mode='dropdown'
                                    selectedValue={t}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setT(itemValue)
                                    }
                                    style={{
                                        color: COLORS.primary,
                                        height: 45,
                                        alignItems:'center',
                                        textAlign:'center'
                                    }}
                                    dropdownIconColor={COLORS.primary}
                                    
                                    >
                                    <Picker.Item label="ໄຕມາດ 1" value='T1' />
                                    <Picker.Item label="ໄຕມາດ 2" value="T2" />
                                    <Picker.Item label="ໄຕມາດ 3" value="T3" />
                                    <Picker.Item label="ໄຕມາດ 4" value="T4" />
                            </Picker>
                        </View>

                        {/* ເລືອກປີ */}
                        <TouchableOpacity
                                style={{flex: 1,
                                    borderBottomColor: COLORS.primary,
                                    borderBottomWidth: 1,
                                    // width:100,
                                    marginHorizontal:20,
                                    paddingTop:10,
                                    paddingBottom: 3,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}
                                onPress={()=>{
                                    setOpenDatePicker(true)
                                }}
                        >
                            <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>{date.getFullYear()}</Text>
                        </TouchableOpacity>
                        <DatePicker
                                title='ເລືອກປີ'
                                modal
                                confirmText='ຕົກລົງ'
                                cancelText='ຍົກເລີກ'
                                mode='date'
                                textColor='#00b3b3'
                                open={openDatePicker}
                                date={date}
                                onConfirm={(date) => {
                                    setOpenDatePicker(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpenDatePicker(false)
                                }}
                        />
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,}}>
                        {/* ເລືອກທະນາຄານ */}
                        <View style={{
                                flex:2,
                                borderBottomColor: COLORS.primary,
                                borderBottomWidth: 1,
                                borderRadius:5,
                                marginHorizontal:20,
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
                                        alignItems:'center',
                                        textAlign:'center'
                                    }}
                                    dropdownIconColor={COLORS.primary}
                                    
                                    >
                                    <Picker.Item label="ALL_BANK" value='ALL_BANK' />
                                    <Picker.Item label="BCEL" value="BCEL" />
                                    <Picker.Item label="LDB" value="LDB" />
                                    <Picker.Item label="JDB" value="JDB" />
                                </Picker>
                        </View>

                        {/* ປຸ່ມຄົ້ນຫາ */}
                        <TouchableOpacity
                                style={{
                                    flex:1,
                                    backgroundColor:COLORS.primary,
                                    justifyContent:'center',
                                    alignItems:'center',
                                    marginHorizontal:20,
                                    borderRadius:5,
                                }}
            
                                onPress={()=>{
                                    getBSDReport(bank,date,t);
                                }}
                        >
                            <Text>ຄົ້ນຫາ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                )
                :
                (
                <View style={{flexDirection:'row',justifyContent:'space-around',padding:5,}}>
                    {/* ເລືອກໄຕມາດ */}
                    <View style={{flex:2,
                            borderBottomColor: COLORS.primary,
                            borderBottomWidth: 1,
                            borderRadius:5,
                            marginHorizontal:20,
                    }}>
                        <Picker
                                mode='dropdown'
                                selectedValue={t}
                                onValueChange={(itemValue, itemIndex) =>
                                    setT(itemValue)
                                }
                                style={{
                                    color: COLORS.primary,
                                    height: 45,
                                    alignItems:'center',
                                    textAlign:'center'
                                }}
                                dropdownIconColor={COLORS.primary}
                                
                                >
                                <Picker.Item label="ໄຕມາດ 1" value='T1' />
                                <Picker.Item label="ໄຕມາດ 2" value="T2" />
                                <Picker.Item label="ໄຕມາດ 3" value="T3" />
                                <Picker.Item label="ໄຕມາດ 4" value="T4" />
                        </Picker>
                    </View>
    
                    {/* ເລືອກປີ */}
                    <TouchableOpacity
                            style={{flex: 1,
                                borderBottomColor: COLORS.primary,
                                borderBottomWidth: 1,
                                // width:100,
                                marginHorizontal:20,
                                paddingTop:10,
                                paddingBottom: 3,
                                justifyContent:'center',
                                alignItems:'center'
                            }}
                            onPress={()=>{
                                setOpenDatePicker(true)
                            }}
                    >
                        <Text style={{color: COLORS.primary, fontSize: SIZES.medium}}>{date.getFullYear()}</Text>
                    </TouchableOpacity>
                    <DatePicker
                            title='ເລືອກປີ'
                            modal
                            confirmText='ຕົກລົງ'
                            cancelText='ຍົກເລີກ'
                            mode='date'
                            textColor='#00b3b3'
                            open={openDatePicker}
                            date={date}
                            onConfirm={(date) => {
                                setOpenDatePicker(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpenDatePicker(false)
                            }}
                    />

                    {/* ເລືອກທະນາຄານ */}
                    <View style={{
                            flex:2,
                            borderBottomColor: COLORS.primary,
                            borderBottomWidth: 1,
                            borderRadius:5,
                            marginHorizontal:20,
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
                                    alignItems:'center',
                                    textAlign:'center'
                                }}
                                dropdownIconColor={COLORS.primary}
                                
                                >
                                <Picker.Item label="ALL_BANK" value='ALL_BANK' />
                                <Picker.Item label="BCEL" value="BCEL" />
                                <Picker.Item label="LDB" value="LDB" />
                                <Picker.Item label="JDB" value="JDB" />
                            </Picker>
                    </View>

                    {/* ປຸ່ມຄົ້ນຫາ */}
                    <TouchableOpacity
                            style={{
                                flex:1,
                                backgroundColor:COLORS.primary,
                                justifyContent:'center',
                                alignItems:'center',
                                marginHorizontal:20,
                                borderRadius:5,
                            }}
        
                            onPress={()=>{
                                getBSDReport(bank,date,t);
                            }}
                    >
                        <Text>ຄົ້ນຫາ</Text>
                    </TouchableOpacity>
                </View>
                )
            }

            {/* end ສ່ວນ Search new */}

            {/* ສ່ວນສະແດງລາຍງານ */}
            {
                Object.keys(data).length !== 0 ?
                (
                <View style={{height: '73%'}}>
                    {/* ຫົວຂໍ້ */}
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:5,backgroundColor: COLORS.secondary,paddingVertical:10,borderTopLeftRadius: 5,borderTopRightRadius: 5,}}>
                        <View style={{flex: 3,paddingLeft:5}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium,}}>ລາຍການ</Text>
                        </View>
                        <View style={{flex:2,justifyContent: 'center',alignItems:'center'}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຈຳນວນ</Text>
                        </View>
                        <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                            <Text style={{color: COLORS.black, fontSize: SIZES.medium}}>ຫົວໜ່ວຍ</Text>
                        </View>
                    </View>
                    {/* ເສັ້ນຂິດ */}
                    <View style={{backgroundColor: COLORS.primary, height:1, marginHorizontal: 5}}/>
                    
                    {/* ສ່ວນສະແດງຂໍ້ມູນ */}
                    <ScrollView>
                        
                        
                        {
                            keys.map((mykey,index)=>{
                                return <ShowItem key={index} index={index} item={data[mykey]} />
                            })
                            
                        }
                    </ScrollView>
                </View>
                )
                : 
                (
                    <View style={{flex: 1, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color: COLORS.gray, fontSize: SIZES.large}}>ບໍ່ມີຂໍ້ມູນ</Text>
                    </View>
                )
            }


            <BackInHomeComponent navigation={navigation}/>
        </View>
    )

}

export default Quaterly